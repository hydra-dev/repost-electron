<template>
  <div>
    <h3>{{buttonLabel}} finding</h3>
    <v-select
      :items="languages"
      return-object
      item-text="label"
      label="Select language"
      v-model="form.language"
    ></v-select>

    <v-text-field
      v-model="form.name[selectedLanguage]"
      :error-messages="nameErrors"
      :counter="150"
      label="Name"
      required
      @input="$v.form.name[selectedLanguage].$touch()"
      @blur="$v.form.name[selectedLanguage].$touch()"
    ></v-text-field>

    <div v-if="! previewMode">
      <v-textarea
        v-model="form.finding[selectedLanguage]"
        label="Finding (markdown supported)"
        required
        :error-messages="findingErrors"
        @input="$v.form.finding[selectedLanguage].$touch()"
        @blur="$v.form.finding[selectedLanguage].$touch()"
      ></v-textarea>

      <v-textarea
        v-model="form.risk[selectedLanguage]"
        label="Risk (markdown supported)"
        required
        :error-messages="riskErrors"
        @input="$v.form.risk[selectedLanguage].$touch()"
        @blur="$v.form.risk[selectedLanguage].$touch()"
      ></v-textarea>

      <v-textarea
        v-model="form.recommendation[selectedLanguage]"
        label="Recommendation (markdown supported)"
        required
        :error-messages="recommendationErrors"
        @input="$v.form.recommendation[selectedLanguage].$touch()"
        @blur="$v.form.recommendation[selectedLanguage].$touch()"
      ></v-textarea>

      <v-combobox
        v-model="selectedTags"
        :items="tags"
        :search-input.sync="search"
        item-text="name"
        return-object
        menu-props="{closeOnClick: true}"
        :loading="tagLoading"
        label="Add some tags"
        multiple
        persistent-hint
        small-chips
      >
        <template v-slot:no-data>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                No results matching "
                <strong>{{ search }}</strong>". Press
                <kbd>enter</kbd> to create a new one
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-combobox>
    </div>
    <div v-else>
      <span v-html="parsedFinding"></span>
    </div>
    {{variables}}
    <v-btn color="blue-grey" class="white--text" @click="toggleMarkdownPreview">
      {{previewEditToggleButtonText}}
      <v-icon right dark>{{previewEditToggleButtonIcon}}</v-icon>
    </v-btn>

    <v-btn color="blue-grey" class="white--text" :disabled="$v.$invalid" @click="saveFinding">
      {{buttonLabel}}
      <v-icon right dark>add</v-icon>
    </v-btn>
  </div>
</template>

<script>
import {
  required,
  maxLength,
  minLength,
  requiredIf
} from "vuelidate/lib/validators";
import showdown from "showdown";
import { EventBus } from "../event-bus";
import { extractVariables } from "../helpers/text";

export default {
  data() {
    return {
      form: {
        name: { en: null, nl: null },
        finding: { en: null, nl: null },
        risk: { en: null, nl: null },
        recommendation: { en: null, nl: null },
        language: { label: "English", value: "en" },
        tags: []
      },
      variables: [],
      tagLoading: false,
      search: null,
      editMode: false,
      languages: [
        { label: "English", value: "en" },
        { label: "Dutch", value: "nl" }
      ],
      selectedTags: [],
      previewMode: false,
      parsedFinding: null,
      findingId: -1,
      tags: []
    };
  },

  validations: {
    form: {
      name: {
        en: {
          maxLength: maxLength(150),
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "en";
          })
        },
        nl: {
          maxLength: maxLength(150),
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "nl";
          })
        }
      },
      risk: {
        en: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "en";
          })
        },
        nl: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "nl";
          })
        }
      },
      finding: {
        nl: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "nl";
          })
        },
        en: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "en";
          })
        }
      },
      recommendation: {
        nl: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "nl";
          })
        },
        en: {
          minLength: minLength(2),
          required: requiredIf(function() {
            return this.form.language.value === "en";
          })
        }
      },
      tags: {
        required,
        minLength: minLength(1)
      }
    }
  },

  watch: {
    form: {
      handler() {
        this.variables = extractVariables(this.findingText);
      },
      deep: true
    },

    selectedTags() {
      this.form.tags = [];
      this.selectedTags.forEach((tag, idx) => {
        if (typeof tag === "string") {
          this.tagLoading = true;
          let that = this;
          this.$http.post("/api/v1/tag", { name: tag }).then(response => {
            that.selectedTags.splice(idx, 1);
            that.selectedTags.push(response.data);
            that.addUniqueTags(response.data);
            this.fetchTags();
            this.tagLoading = false;
          });
        } else {
          this.addUniqueTags(tag);
        }
      });
    }
  },

  methods: {
    toggleMarkdownPreview() {
      const converter = new showdown.Converter();
      this.parsedFinding = converter.makeHtml(this.findingText);
      this.previewMode = !this.previewMode;
    },

    addUniqueTags(tag) {
      let index = this.form.tags.indexOf(tag);
      if (index === -1) {
        this.form.tags.push(tag);
      }
    },

    saveFinding() {
      EventBus.$emit("startLoading");
      if (this.editMode) {
        this.$http
          .patch(`/api/v1/finding/${this.findingId}`, this.form)
          .then(() => {
            EventBus.$emit("stopLoading");
            this.$router.push({ name: "all-findings" });
          });
      } else {
        this.$http.post("/api/v1/finding", this.form).then(response => {
          console.log(response.data);
          EventBus.$emit("stopLoading");
          this.$router.push({ name: "all-findings" });
        });
      }
    },

    setMultiLanguageObjectProp(key, object) {
      const that = this;
      this.languages.forEach(language => {
        if (language.value in object) {
          that.form[key][language.value] = object[language.value];
        }
      });
    },

    fetchTags() {
      this.$http.get("/api/v1/tag").then(response => {
        this.tags = response.data;
      });
    }
  },

  computed: {
    findingText() {
      return `${this.form.finding[this.selectedLanguage]}\n${
        this.form.risk[this.selectedLanguage]
      }\n${this.form.recommendation[this.selectedLanguage]}`;
    },

    previewEditToggleButtonText() {
      if (this.previewMode) {
        return "Edit";
      }

      return "Preview";
    },

    buttonLabel(){
      if (this.editMode) {
        return "Edit";
      }

      return "Create";
    },

    previewEditToggleButtonIcon() {
      if (this.previewMode) {
        return "edit";
      }

      return "pageview";
    },

    selectedLanguage() {
      return this.form.language.value;
    },

    nameErrors() {
      const errors = [];
      if (!this.$v.form.name[this.selectedLanguage].$dirty) return errors;
      !this.$v.form.name[this.selectedLanguage].maxLength &&
        errors.push("Name must be at most 150 characters long");
      !this.$v.form.name[this.selectedLanguage].minLength &&
        errors.push("Name must be at least 2 characters long");
      !this.$v.form.name[this.selectedLanguage].required &&
        errors.push("Name is required.");
      return errors;
    },

    riskErrors() {
      const errors = [];
      if (!this.$v.form.risk[this.selectedLanguage].$dirty) return errors;
      !this.$v.form.risk[this.selectedLanguage].minLength &&
        errors.push("Risk should be at least 2 characters long");
      !this.$v.form.risk[this.selectedLanguage].required &&
        errors.push("Risk is required.");
      return errors;
    },

    findingErrors() {
      const errors = [];
      if (!this.$v.form.finding[this.selectedLanguage].$dirty) return errors;
      !this.$v.form.finding[this.selectedLanguage].minLength &&
        errors.push("Finding should be at least 2 characters long");
      !this.$v.form.finding[this.selectedLanguage].required &&
        errors.push("Finding is required.");
      return errors;
    },

    recommendationErrors() {
      const errors = [];
      if (!this.$v.form.recommendation[this.selectedLanguage].$dirty)
        return errors;
      !this.$v.form.recommendation[this.selectedLanguage].minLength &&
        errors.push("Recommendation should be at least 2 characters long");
      !this.$v.form.recommendation[this.selectedLanguage].required &&
        errors.push("Recommendation is required.");
      return errors;
    }
  },

  mounted() {
    const params = this.$route.params;
    if ("id" in params) {
      this.editMode = true;
      EventBus.$emit("startLoading");
      let that = this;
      this.findingId = params.id;
      this.$http.get(`/api/v1/finding/${params.id}`).then(response => {
        console.log(response.data);
        EventBus.$emit("stopLoading");
        that.setMultiLanguageObjectProp("name", response.data.name);
        that.setMultiLanguageObjectProp("finding", response.data.finding);
        that.setMultiLanguageObjectProp("risk", response.data.risk);
        that.setMultiLanguageObjectProp(
          "recommendation",
          response.data.recommendation
        );
        that.form.tags = response.data.tags;
        this.selectedTags = response.data.tags;
      });
    }

    this.fetchTags();
  }
};
</script>

<style>
</style>

