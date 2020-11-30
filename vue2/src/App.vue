<template>
  <div id="app">
    <div id="nav">
      <index-comp :catalog-json="catalog_json" :base-uri="base_uri" @api-selected="changeJsonPath($event)" v-if="displaying_page === 'index'"></index-comp>
      <swagger-comp :json-path="selected_json_path" @click-return-btn="changeView($event)" v-if="displaying_page === 'swagger'"></swagger-comp>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

import Index from '@/views/Index.vue'; // @ is an alias to /src
import Swagger from '@/views/Swagger.vue'; // @ is an alias to /src

export default  {
    name : 'App',
    data() {
      return {
        catalog_json: [],
        selected_json_path: '',
        displaying_page: 'index',
        base_uri: ''
      }
    },
    components: {
        'index-comp': Index,
        'swagger-comp': Swagger,
    },
    created() {
      this.$set(this,'catalog_json', []);
    },
    async mounted() {
      await this.init();
    },
    watch: {
        catalogJson(newValue) {
            this.$set(this, 'catalogs', newValue);
        }
    },
    methods:{
      async init() {
        let tmp = document.getElementById('vscode_path');
        this.$set(this,'base_uri', tmp.dataset.workingDirectoryPath);

        const response = await axios.get(tmp.dataset.workingDirectoryPath+"apicatalog.json");
        await this.$set(this,'catalog_json', response.data);
      },
      changeJsonPath(path) {
        if(this.base_uri !== "") {
          this.$set(this,'selected_json_path', this.base_uri + path);
        } else {
          this.$set(this, 'selected_json_path', path);
        }

        this.$set(this,'displaying_page', 'swagger');
      },
      async changeView(display_page_name) {
        this.$set(this, 'displaying_page', display_page_name);
        await this.init();
      }
  }

}

</script>
