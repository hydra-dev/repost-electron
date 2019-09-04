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

    <SubstituteVariablesDialogComponent :dialog="showSubstituteDialog" @hideDialog="hideSubstituteDialog" v-model="variables"/>

    <v-btn v-if="! substituded" class="mx-2" fab dark large color="cyan" @click="substituteVariablesDialog">
      <v-icon dark>swap_horiz</v-icon>
    </v-btn>

    <v-btn v-else class="mx-2" fab dark large color="cyan" @click="revertOldFinding">
      <v-icon dark>restore</v-icon>
    </v-btn>
  </div>
</template>

<script>
import showdown from "showdown";
import SubstituteVariablesDialogComponent from './Dialogs/SubstituteVariablesDialogComponent'
import { findById } from './../local-finding-index'
import { EventBus } from './../event-bus'
import { extractVariables } from './../helpers/text'

export default {
  data() {
    return {
      findingCopy: null, // Used to revert after a subtitution
      finding: {name: {en: null, nl: null}, risk: {en: null, nl: null}, finding: {en: null, nl: null}, recommendation: {en: null, nl: null}},
      languages: [],
      selectedLanguage: 'en',
      source: 'online',
      showSubstituteDialog: false,
      variables: [],
      substituded: false,
    };
  },

  components: {
    SubstituteVariablesDialogComponent
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

  watch: {
    finding: {
      handler(){
          this.variables = extractVariables(this.finding['finding'][this.selectedLanguage], false);
          this.variables = this.variables.concat(extractVariables(this.finding['risk'][this.selectedLanguage], false));
          this.variables = this.variables.concat(extractVariables(this.finding['recommendation'][this.selectedLanguage], false))
      },
      deep: true,
    }
  },

  methods: {
      convertToMarkdown(text){
        const converter = new showdown.Converter();
        return converter.makeHtml(text); 
      },

      substituteVariablesDialog(){
        this.showSubstituteDialog = true;
      },

      /**
       * Replace variables in the finding, risk and recommendation section named *label* with *value*
       */
      replaceVariable(label, value){
        const variableNotation = '${' + label + '}'
        this.finding.finding[this.selectedLanguage] = this.finding.finding[this.selectedLanguage].replace(variableNotation, value);
        this.finding.risk[this.selectedLanguage] = this.finding.risk[this.selectedLanguage].replace(variableNotation, value);
        this.finding.recommendation[this.selectedLanguage] = this.finding.recommendation[this.selectedLanguage].replace(variableNotation, value);
      },

      hideSubstituteDialog(){
        this.showSubstituteDialog = false;
        this.variables.forEach(variable => {
          if (variable.substitutedValue) {
            this.replaceVariable(variable.label, variable.substitutedValue);
            this.substituded = true;
          }
        })
      },

      revertOldFinding(){
        this.finding = JSON.parse(JSON.stringify(this.findingCopy));
        this.substituded = false;
      }
  },

  mounted() {
    const findingId = this.$route.params.id;    // {id}-{language}
    const findingIdSplitted = findingId.split('-')
    const findingNumericalId = findingIdSplitted[0]
    EventBus.$emit('startLoading')

    // If connection -> get from backend
    this.$uncaughtHttp.get(`/api/v1/finding/${findingNumericalId}`).then(response => {
        this.finding = response.data;
        this.languages = Object.keys(this.finding.name);
        this.findingCopy = JSON.parse(JSON.stringify(this.finding));  //Create copy of the finding
        EventBus.$emit('stopLoading')
    }, () => {
        // Else -> get by ID from index
        const indexedFinding = findById(findingId);
        this.selectedLanguage = findingIdSplitted[1]
        this.finding['name'][this.selectedLanguage] = indexedFinding.name;
        this.finding['finding'][this.selectedLanguage] = indexedFinding.finding;
        this.finding['risk'][this.selectedLanguage] = indexedFinding.risk;
        this.finding['recommendation'][this.selectedLanguage] = indexedFinding.recommendation;
        this.source = 'local'
        this.findingCopy = JSON.parse(JSON.stringify(this.finding));  // Create copy of the finding
        EventBus.$emit('stopLoading')
    });

  }
};
</script>

<style>
</style>


