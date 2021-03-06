new Vue({
    el: '#app',
    data: {
        wxLoading: true,
        searchQuery: '',
        currentTemp: '',
        currentWx: '',
        wxForecast: [],
        favorites: [
            {
                title: "UNMC Outlook",
                url: "https://outlook.office365.com/mail/inbox",
                icon: "https://outlook-1.cdn.office.net/assets/mail/pwa/v1/pngs/apple-touch-icon.png"
            },
            {
                title: "UNMC AppStore",
                url: "https://appstore.unmc.edu",
                icon: "https://logo.clearbit.com/unmc.edu"
            },
            {
                title: "UNMC Operational Analytics",
                url: "https://univnebrmedcntr.sharepoint.com/sites/vcresearch/analytics/",
                icon: "https://is4-ssl.mzstatic.com/image/thumb/Purple113/v4/96/f9/3d/96f93d70-a8bd-2e49-3694-8bfc4a24ad6f/source/512x512bb.jpg"
            },
            {
                title: "Omaha Weather",
                url: "https://forecast.weather.gov/MapClick.php?lat=41.24595500000004&lon=-95.99415499999998",
                icon: "https://logo.clearbit.com/forecast.weather.gov"
            },
            {
                title: "Omaha Radar",
                url: "https://radar.weather.gov/?settings=v1_eyJhZ2VuZGEiOnsiaWQiOiJ3ZWF0aGVyIiwiY2VudGVyIjpbLTk2LjAwMiw0MS4yNDVdLCJ6b29tIjo3LCJsb2NhdGlvbiI6Wy05Ni4wMDIsNDEuMjQ1XX0sImJhc2UiOiJzdGFuZGFyZCIsImNvdW50eSI6ZmFsc2UsImN3YSI6ZmFsc2UsInN0YXRlIjpmYWxzZSwibWVudSI6dHJ1ZSwic2hvcnRGdXNlZE9ubHkiOmZhbHNlfQ%3D%3D#/",
                icon: "http://logo.clearbit.com/radar.weather.gov"
            },
            {
                title: "UNO Canvas",
                url: "https://unomaha.instructure.com",
                icon: "https://du11hjcvx0uqb.cloudfront.net/br/dist/images/apple-touch-icon-585e5d997d.png"
            }
        ]
    },
    mounted(){
        this.getWx()
        this.getWxForecast()
    },
    methods: {
        getWx(){
            const xhr = new XMLHttpRequest()
            const url = 'https://api.weather.gov/stations/koma/observations/latest'
            xhr.open('GET', url)
            xhr.setRequestHeader('accept', 'application/ld+json')
            xhr.responseType = 'json'
            xhr.onload = () => {
                var vm = this
                this.currentTemp = Math.round(xhr.response.temperature.value * 1.8 + 32)
                vm.currentWx = xhr.response.textDescription
                vm.wxLoading = false
            }
        xhr.send()
        },
        getWxForecast(){
            const xhr = new XMLHttpRequest()
            const url = 'https://api.weather.gov/gridpoints/OAX/80,58/forecast'
            xhr.open('GET', url)
            xhr.setRequestHeader('accept', 'application/ld+json')
            xhr.responseType = 'json'
            xhr.onload = () => {
                var vm = this
                this.wxForecast = xhr.response.periods.slice(0,6)
            }
            xhr.send()
        },
        go(url){
            window.location.assign(url)
        }
    }
})