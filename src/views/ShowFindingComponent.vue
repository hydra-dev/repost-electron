<template>
  <div v-if="finding">
    <h1>{{finding.name[selectedLanguage]}}</h1>
    <i v-if="source === 'online'">Last update {{finding.updated_at}}</i>
    <i v-else>Fetched from local database</i>
    <v-divider></v-divider>
    <b>Finding</b>
    <span v-html="findingMd"></span>
    <v-divider />
    <b>Risk</b>
    <span v-html="riskMd"></span>
    <v-divider />
    <b>Recommendation</b>
    <span v-html="recommendationMd"></span>
  </div>
</template>

<script>
import showdown from "showdown";
import { findById } from './../local-finding-index'
import { EventBus } from './../event-bus'

export default {
  data() {
    return {
      finding: {name: {en: null, nl: null}, risk: {en: null, nl: null}, finding: {en: null, nl: null}, recommendation: {en: null, nl: null}},
      languages: [],
      selectedLanguage: 'en',
      source: 'online'
    };
  },

  computed:{
      findingMd(){
          if (this.finding.finding) return this.convertToMarkdown(this.finding.finding[this.selectedLanguage])
          return ""
      },

      riskMd(){
          if (this.finding.risk) return this.convertToMarkdown(this.finding.risk[this.selectedLanguage])
          return ""
      },

      recommendationMd(){
          if (this.finding.recommendation) return this.convertToMarkdown(this.finding.recommendation[this.selectedLanguage])
          return ""
      }
  },

  methods: {
      convertToMarkdown(text){
        const converter = new showdown.Converter();
        return converter.makeHtml(text); 
      }
  },

  mounted() {
    const findingId = this.$route.params.id;    // {id}-{language}
    const findingIdSplitted = findingId.split('-')
    const findingNumericalId = findingIdSplitted[0]
    EventBus.$emit('startLoading')

    // If connection -> get from backend
    this.$http.get(`/api/v1/finding/${findingNumericalId}`).then(response => {
        this.finding = response.data;
        this.languages = Object.keys(this.finding.name);
    }, () => {
        // Else -> get by ID from index
        const indexedFinding = findById(findingId);
        this.selectedLanguage = findingIdSplitted[1]
        this.finding['name'][this.selectedLanguage] = indexedFinding.name;
        this.finding['finding'][this.selectedLanguage] = indexedFinding.finding;
        this.finding['risk'][this.selectedLanguage] = indexedFinding.risk;
        this.finding['recommendation'][this.selectedLanguage] = indexedFinding.recommendation;
        this.source = 'local'
    });

    EventBus.$emit('stopLoading')
  }
};
</script>

<style>
</style>


