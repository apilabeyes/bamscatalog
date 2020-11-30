<template>
<div id="root" style="user-select: auto;">
    <div style="user-select: auto;">
        <div style="font-family: &quot;Helvetica Neue&quot;, Helvetica, &quot;Segoe UI&quot;, Arial, freesans, sans-serif; color: black; font-weight: 300; line-height: 1.45; font-size: 15px; padding: 20px 40px 20px 40px; border-radius: 2px; background-color: rgb(255, 255, 255); user-select: auto;">
            <div style="border-bottom: 1px solid rgb(238, 238, 238); padding-top: 10px; margin-bottom: 10px; user-select: auto;">
                <h1 style="margin: 0px; padding: 0px; font-size: 35px; user-select: auto;">API Catalog</h1>
                <h2 style="margin: 0px 0px 10px; padding: 0px; font-weight: 400; font-size: 22px; user-select: auto;">Index</h2>
            </div>
        </div>
    </div>
    <div id="story-root" style="user-select: auto;">
        <div class="card-container__Cards-nosm6f-0 fVifSY" style="user-select: auto;">
            <card-comp :card-data="catalog" :base-uri="base_uri" v-bind:key="'card-comp'+key" v-for="(catalog,key) in catalogs" @card-clicked="$emit('api-selected', $event)"></card-comp>
        </div>
    </div>
</div>

</template>

<script>

import Card from '@/components/atoms/Card.vue'; // @ is an alias to /src

export default  {
    name : 'Index',
    props:{
        baseUri: {
            type: String,
            required: false,
            default: ''
        },
        catalogJson: {
            type:Array,
            required:true
        }
    },
    data: function() {
        return {
            catalogs: [],
            base_uri: ''
        }
    },
    components: {
        'card-comp': Card
    },
    watch: {
        baseUri(newValue) {
            this.$set(this, 'base_uri', newValue);
        },
        catalogJson(newValue) {
            this.$set(this, 'catalogs', newValue);
        }
    }

}
</script>

<style>
/* reset.css */
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
    display: block;
}

body {
    line-height: normal;
}

ol,
ul {
    list-style: none;
}

blockquote,
q {
    quotes: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
html {
    --font-monospace: Menlo, Monaco, Consolas, 'Droid Sans Mono', 'Courier New', monospace,
    'Droid Sans Fallback';
    --font-default: -apple-system, BlinkMacSystemFont, 'Segoe WPC', 'Segoe UI',
    'HelveticaNeue-Light', 'Ubuntu', 'Droid Sans', sans-serif;
    --font-ligatures: normal;
}

body {
    padding: 40px;
    overflow: auto;
    font-family: var(--font-default);
    font-size: var(--font-size);
}

#root {
    max-width: 70rem;
    margin-left: auto;
    margin-right: auto;
}

#story-root {
    padding: 0.5rem 40px;
}

#story-root, #dropdowns-container {
    background-color: rgb(255, 255, 255);
    color: rgb(85, 85, 85);
}

html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
}

.fVifSY {
    display: flex;
    flex-wrap: wrap;
    padding-top: var(--padding-md);
}
</style>
