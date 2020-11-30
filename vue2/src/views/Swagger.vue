<template>
    <div id="swagger-ui"></div>
</template>
<script>
 import { SwaggerUIBundle, SwaggerUIStandalonePreset } from "swagger-ui-dist"
 
export default  {
    name : 'Swagger',
    props:{
        jsonPath: {
            type:String,
            required:true
        }
    },
    data: function() {
        return {
            json_path: this.jsonPath,
        }
    },
    async mounted(){
        await this.callSwagger();
        await this.insertReturnButton();
    },
    watch: {
        jsonPath(newValue) {
            this.$set(this, 'json_path', newValue);
        }
    },
    methods: {
        callSwagger() {
            const ui = SwaggerUIBundle({
            url: this.json_path,
            dom_id: '#swagger-ui',
            deepLinking: true,
            presets: [
                SwaggerUIBundle.presets.apis,
                SwaggerUIStandalonePreset
            ],
            plugins: [
                SwaggerUIBundle.plugins.DownloadUrl
            ],
            layout: "StandaloneLayout"
            })
            // End Swagger UI call region

            window.ui = ui
        },
        insertReturnButton() {
            let parentHTML = document.getElementsByClassName('download-url-wrapper')[0];
            if(parentHTML) {
                let returnBtnElement = document.createElement("button")
                let tmp = this;
                returnBtnElement.innerText="Return"
                returnBtnElement.id="returnBtn"
                returnBtnElement.style="margin:0 0 0 5px"
                returnBtnElement.className="btn authorize"
                returnBtnElement.type="button"
                returnBtnElement.onclick= function(){
                    tmp.$emit('click-return-btn', 'index');
                }
                parentHTML.appendChild(returnBtnElement);
            }
        }
    }
}

</script>
<style>
    html
    {
    box-sizing: border-box;
    overflow: -moz-scrollbars-vertical;
    overflow-y: scroll;
    }

    *,
    *:before,
    *:after
    {
    box-sizing: inherit;
    }

    .topbar-wrapper img {
        content:url('./icons/bams_swaggerui.png');
    }

    body
    {
    margin:0;
    background: #fafafa;
    }
</style>
