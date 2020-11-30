<template>
    <div class="card__StyledCard-sc-1gny77x-0 bVeJeQ deselected" :style="backgroundImg" style="user-select: auto;" @click="$emit('card-clicked', values.api)">
        <div class="card__CardHeader-sc-1gny77x-1 cHYFZe" style="user-select: auto;">
            <div class="header-item card-badge" style="user-select: auto;">{{values.category}}</div>
            <!--<div class="header-item card-menu" style="user-select: auto;">
                <label class="card-checkbox-label" style="user-select: auto;">
                    <input type="checkbox" style="user-select: auto;">
                    <span class="card-checkbox" style="user-select: auto;"></span>
                </label>
            </div>
            -->
        </div>
        <div class="card__CardBody-sc-1gny77x-2 iXypFd" style="user-select: auto;">
            <div class="title" style="user-select: auto;">{{values.name}}</div>
            <div class="version" style="user-select: auto;">{{values.description}}</div>
        </div>
        <div class="card__CardFooter-sc-1gny77x-3 cZovGs" style="user-select: auto;">
            <!-- <span style="user-select: auto;">
                <div class="svg-icon__SvgIconStyled-k2d8g9-0 kTmEfP" style="user-select: auto;">
                    <svg width="1em" height="1em" viewBox="0 0 15 20" style="user-select: auto;">
                        <path 
                            d="M11.429 2.857A2.859 2.859 0 008.57 5.714c0 1.054.578 1.966 1.429 2.462v.395s0 2.858-2.857 2.858c-1.185 0-2.113.253-2.857.643V5.319a2.846 2.846 0 001.428-2.462 2.858 2.858 0 00-5.714 0C0 3.911.577 4.823 1.429 5.32v9.363A2.843 2.843 0 000 17.142 2.859 2.859 0 002.857 20a2.859 2.859 0 002.857-2.857c0-.748-.294-1.423-.764-1.934.416-.51 1.091-.923 2.193-.923 5.67 0 5.714-5.715 5.714-5.715v-.395a2.847 2.847 0 001.429-2.462 2.859 2.859 0 00-2.857-2.857zM2.857 1.43c.79 0 1.429.638 1.429 1.428 0 .79-.639 1.429-1.429 1.429S1.43 3.647 1.43 2.857 2.067 1.43 2.857 1.43zm0 17.142a1.428 1.428 0 110-2.858 1.428 1.428 0 010 2.858zM11.43 7.143c-.79 0-1.429-.638-1.429-1.429 0-.79.639-1.428 1.429-1.428s1.428.638 1.428 1.428c0 .79-.639 1.429-1.428 1.429z"
                            style="user-select: auto;">
                        </path>
                    </svg>
                </div>
                <div class="icoLabel" style="user-select: auto;">feat/small-changes</div>
            </span>
            <span style="user-select: auto;">
                <div class="svg-icon__SvgIconStyled-k2d8g9-0 kTmEfP" style="user-select: auto;">
                    <svg width="1em" height="1em" viewBox="0 0 12 12" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" style="user-select: auto;">
                        <path 
                            d="M6 0a6 6 0 110 12A6 6 0 016 0zm0 1.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zM6.5 3v2.5H9V7H5V3h1.5z"
                            style="user-select: auto;">
                        </path>
                    </svg>
                </div>
                <div class="icoLabel" style="user-select: auto;">2 hours ago by gschier</div>
            </span> -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        baseUri: {
            type: String,
            required: false,
            default: ''
        },
        cardData: {
          type: Object,
          required: true
        }
    },
    data() {
        return {
            errors: {},
            base_uri:this.baseUri,
            values: {
                name: this.cardData.name,
                description: this.cardData.description,
                category: this.cardData.category,
                api: this.cardData.api,
                images: this.cardData.images,
            }
        }
    },
  watch: {
      baseUri(newValue) {
          this.$set(this, 'base_uri', newValue);
      },
      cardData(newValue) {
          this.$set(this.values, 'name', newValue.name);
          this.$set(this.values, 'description', newValue.description);
          this.$set(this.values, 'caregory', newValue.category);
          this.$set(this.values, 'api', newValue.api);
          this.$set(this.values, 'images', newValue.images);
      }
  },
  computed: {
      backgroundImg() {
          if(this.values.images) {
            return {'background-image': 'url('+this.base_uri+this.values.images+')', 'background-size':'cover'};
          }
          return "";
      }
  }
}
</script>
<style data-theme-name="studio-light">[theme="studio-light"],
[subtheme="studio-light"] {
    /* Background */
    --color-bg: rgb(255, 255, 255);
    --color-bg-rgb: 255, 255, 255;
    --color-success: rgb(61, 156, 98);
    --color-success-rgb: 61, 156, 98;
    --color-notice: rgb(187, 151, 0);
    --color-notice-rgb: 187, 151, 0;
    --color-warning: rgb(214, 128, 62);
    --color-warning-rgb: 214, 128, 62;
    --color-danger: rgb(218, 91, 86);
    --color-danger-rgb: 218, 91, 86;
    --color-surprise: rgb(96, 48, 191);
    --color-surprise-rgb: 96, 48, 191;
    --color-info: rgb(0, 48, 82);
    --color-info-rgb: 0, 48, 82;

    /* Foreground */
    --color-font: rgb(85, 85, 85);
    --color-font-rgb: 85, 85, 85;
    --color-font-success: rgb(255, 255, 255);
    --color-font-success-rgb: 255, 255, 255;
    --color-font-notice: rgb(255, 255, 255);
    --color-font-notice-rgb: 255, 255, 255;
    --color-font-warning: rgb(255, 255, 255);
    --color-font-warning-rgb: 255, 255, 255;
    --color-font-danger: rgb(255, 255, 255);
    --color-font-danger-rgb: 255, 255, 255;
    --color-font-surprise: rgb(255, 255, 255);
    --color-font-surprise-rgb: 255, 255, 255;
    --color-font-info: rgb(255, 255, 255);
    --color-font-info-rgb: 255, 255, 255;

    /* Highlight */
    --hl: rgb(130, 130, 130);
    --hl-rgb: 130, 130, 130;
    --hl-xxs: rgba(130, 130, 130, 0.05);
    --hl-xxs-rgb: 130, 130, 130, 0.05;
    --hl-xs: rgba(130, 130, 130, 0.1);
    --hl-xs-rgb: 130, 130, 130, 0.1;
    --hl-sm: rgba(130, 130, 130, 0.25);
    --hl-sm-rgb: 130, 130, 130, 0.25;
    --hl-md: rgba(130, 130, 130, 0.35);
    --hl-md-rgb: 130, 130, 130, 0.35;
    --hl-lg: rgba(130, 130, 130, 0.5);
    --hl-lg-rgb: 130, 130, 130, 0.5;
    --hl-xl: rgba(130, 130, 130, 0.8);
    --hl-xl-rgb: 130, 130, 130, 0.8;
}
</style>
<style>
html {
    /* Font Size */
    --font-size-xxs: 10px;
    --font-size-xs: 11px;
    --font-size-sm: 12px;
    --font-size-md: 13px;
    --font-size-lg: 14px;
    --font-size-xl: 16px;
    --font-size-xxl: 18px;
    --font-size-xxxl: 22px;
    --font-size: var(--font-size-md);

    /* Font Weight */
    --font-weight-regular: 400;
    --font-weight-medium: 600;
    --font-weight-bold: 700;

    /* Line Height */
    --font-line-height-sm: calc(var(--font-size) * 1);
    --font-line-height-md: calc(var(--font-size) * 1.25);
    --font-line-height-lg: calc(var(--font-size) * 1.4);
    --font-line-height-xl: calc(var(--font-size) * 1.75);
    --font-line-height-xxl: calc(var(--font-size) * 2);
    --font-line-height-xxxl: calc(var(--font-size) * 2.25);

    /* Spacing */
    --spacing-xs: calc(var(--font-size) * 0.4);
    --spacing-sm: calc(var(--font-size) * 0.6);
    --spacing-md: calc(var(--font-size) * 1);
    --spacing-lg: calc(var(--font-size) * 1.25);
    --spacing-xl: calc(var(--font-size) * 1.5);
    --spacing-xxl: calc(var(--font-size) * 2);
    --spacing-xxxl: calc(var(--font-size) * 3);
    --spacing-xxxxl: calc(var(--font-size) * 4);

    /* Colors */
    --color-border: var(--hl-md);
    --color-sidebar: var(--color-bg);
    --color-text: var(--color-font);

    /* Padding */
    --padding-md: calc(var(--font-size) * 1.2);
    --padding-sm: calc(var(--font-size) * 0.6);
    --padding-xs: calc(var(--font-size) * 0.4);
    --padding-xxs: calc(var(--font-size) * 0.2);
    --padding-lg: calc(var(--font-size) * 2.5);
    --padding-xl: calc(var(--font-size) * 5);

    /* Wrapper */
    --line-height-lg: calc(var(--font-size) * 4.5);
    --line-height-md: calc(var(--font-size) * 3.6);
    --line-height-sm: calc(var(--font-size) * 2.88);
    --line-height-xs: calc(var(--font-size) * 2.448);
    --line-height-xxs: calc(var(--font-size) * 2.08);

    /* Breakpoints */
    --breakpoint-lg: 1100px;
    --breakpoint-md: 880px;
    --breakpoint-sm: 660px;

    /* Radius */
    --radius-sm: calc(var(--font-size) * 0.2);
    --radius-md: calc(var(--font-size) * 0.3);

    /* Scrollbars */
    --scrollbar-width: calc(var(--font-size) * 0.6);

    /* Modals */
    --modal-width: calc(var(--font-size) * 60);
    --modal-width-wide: calc(var(--font-size) * 70);
    --modal-width-skinny: calc(var(--font-size) * 30);

    /* Other */
    --drag-width: calc(var(--font-size) * 0.5);
    --height-nav: var(--line-height-md);
}
    .bVeJeQ.deselected {
        background-color: transparent;
        border: 1px solid rgba(130, 130, 130, 0.25);
        cursor: default;
    }

    .bVeJeQ.deselected:hover {
        border-color: rgb(96, 48, 191);
        box-shadow: rgba(0, 0, 0, 0.2) 3px 3px 20px -10px;
    }

    .bVeJeQ {
        transition: all 0.1s ease-out 0s;
    }

    .bVeJeQ:hover {
        border-color: rgb(96, 48, 191);
        box-shadow: var(--padding-sm) var(--padding-sm) calc(var(--padding-xl) * 1.5) calc(0px - var(--padding-xl)) rgba(0,0,0,0.2);
        cursor: pointer;
    }

    .bVeJeQ {
        height: 196px;
        width: 204px;
        border: 1px solid rgba(130, 130, 130, 0.25);
        display: flex;
        flex-direction: column;
        -webkit-box-flex: 0;
        flex-grow: 0;
        flex-shrink: 0;
        margin: 0 var(--padding-md) var(--padding-md) 0;
        color: rgb(85, 85, 85);
        border-radius: var(--radius-md);
        background-color:rgba(255,255,255,0.9);
        background-blend-mode:lighten;
    }

    .cHYFZe {
        text-align: left;
        padding-top: var(--padding-md);
        padding-right: 0px;
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        -webkit-box-align: center;
        align-items: center;
    }

    .iXypFd {
        justify-content: normal;
        font-weight: 400;
        border-radius: 3px;
        background-color: rgba(255,255,255, 0.9);
        color: var(--font-color);
        margin-top: var(--padding-md);
        padding-left: var(--padding-xs);
        padding-right: var(--padding-xs);

    }

    .iXypFd .title {
        font-weight: bold;
        width:100%;
        height: calc(var(--font-size-xs)*2);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .iXypFd .version {
        font-size: var(--font-size-xs);
        padding-top: var(--padding-xs);
        padding-bottom: var(--padding-xs);
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        width: 100%;
        height: calc(var(--font-size-xs)*3.5);
        overflow: hidden;
    }

    .cZovGs {
        margin-top: auto;
        padding-left: var(--padding-md);
        padding-bottom: var(--padding-sm);
        color: var(--hl-xl);
    }

    .cHYFZe .card-badge {
        background-color: rgba(130, 130, 130, 0.8);
        border-top-right-radius: var(--radius-sm);
        border-bottom-right-radius: var(--radius-sm);
        display: flex;
        color: white;
        -webkit-box-align: center;
        align-items: center;
        padding-left: var(--padding-md);
        padding-right: var(--padding-md);
    }

    .cHYFZe .header-item {
        font-size: var(--font-size-xs);
        padding: var(--padding-xs);
    }

    .cHYFZe .card-checkbox-label {
        display: block;
        position: relative;
        margin: auto;
        cursor: default;
        font-size: var(--font-size-xl);
        line-height: var(--font-size-xl);
        height: var(--font-size-xl);
        width: var(--font-size-xl);
        clear: both;
    }

    .cHYFZe .card-checkbox-label input {
        position: absolute;
        opacity: 0;
        cursor: default;
    }

    .cHYFZe .card-checkbox-label .card-checkbox {
        position: absolute;
        top: 0px;
        left: 0px;
        height: var(--font-size-xl);
        width: var(--font-size-xl);
        background-color: rgba(96, 48, 191, 0.1);
        border-radius: var(--radius-md);
        border: 2px solid rgb(96, 48, 191);
    }

    .cZovGs .icoLabel {
        margin-bottom: var(--padding-xxs);
        padding-left: var(--padding-xs);
        font-size: var(--font-size-sm);
    }
    .cZovGs span {
    display: flex;
    justify-content: left;
    flex-direction: row;
  }
    .kTmEfP {
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    white-space: nowrap;
  }
  </style>
