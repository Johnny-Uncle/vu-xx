<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>

</template>

<script>
    import {ref, computed, onMounted} from '@vue/composition-api'

    export default {
        name: "SvgIcon",
        props: {
            iconClass: {
                type: String,
                default: ''
            },
            className: {
                type: String,
                default: ''
            }
        },
        setup(props) {
            // computed计算属性，得出最终结果，并返回
            // < icon图标 >
            const iconName = computed(() =>
                `#icon-${props.iconClass}`
            );
            // < icon样式 >
            const svgClass = computed(() => {
                if (props.className) {
                    return `svg-icon ${props.className}`
                } else {
                    return `svg-icon`
                }
            });
            return {
                iconName, svgClass
            }
        }
    }
</script>

<style lang="scss" scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        font-size: 15px;
        fill: currentColor;
        color: #ffffff;
        margin-top: -2px ;
    }
    .dog{
        font-size: 100px;
        margin-right: 0;
    }
</style>
