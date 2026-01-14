const icons = import.meta.glob('../assets/img/tabbar/*.png', { eager: true, import: 'default' })
// 类似这种 ：{"../assets/img/tabbar/tab_favor.png": "/src/assets/img/tabbar/tab_favor.png"}
// console.log(icons)
const getAssetURL = (image) => {
    return icons[`../assets/img/${image}`]
}
export default getAssetURL
