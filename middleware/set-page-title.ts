export default defineNuxtRouteMiddleware((to, from) => {
    const pageTitle = String(to.query.name)

    useHead({
        title: pageTitle
    })
})