<template>
    <div v-if="countDay" id="server" class="container">
        <article>
            <h1>We&rsquo;ll be back soon!</h1>
            <div>
                <p>Sorry for the inconvenience but we&rsquo;re performing some maintenance at the moment. If you need to you
                    can always <router-link :to="{ name: 'Contact' }">contact us</router-link>, otherwise we&rsquo;ll be
                    back online shortly!</p>
                <p>&mdash; The Team</p>

            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-between;">
                <p class="day"></p>
                <p class="hour"></p>
                <p class="minute"></p>
                <p class="second"></p>
            </div>
        </article>
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
export default defineComponent({
    name: "ServerError",
    data() {
        let countDay = new Date(0);
        return {
            countDay
        }

    },
    methods: {
        countDown() {
            this.countDay = new Date('August 15, 2023 00:00:00');
            const now = new Date();
            const counter: number = Number(this.countDay) - Number(now);
            const second = 1000;
            const minute = second * 60;
            const hour = minute * 60;
            const day = hour * 24;
            const textDay = Math.floor(counter / day);
            const textHour = Math.floor((counter % day) / hour);
            const textMinute = Math.floor((counter % hour) / minute);
            const textSecond = Math.floor((counter % minute) / second);
            (<HTMLInputElement>document.querySelector(".day")).innerText = textDay + ' Days';
            (<HTMLInputElement>document.querySelector(".hour")).innerText = textHour + ' Hours';
            (<HTMLInputElement>document.querySelector(".minute")).innerText = textMinute + ' Minutes';
            (<HTMLInputElement>document.querySelector(".second")).innerText = textSecond + ' Seconds';

        },

        startCounter: function () {
            setInterval(this.countDown, 1000);
        },
    },
    mounted() {
        this.startCounter();

    },


})

</script>
<style scoped>
body {
    text-align: center;
    padding: 20px;
    font: 20px Helvetica, sans-serif;
    color: #efe8e8;
}

@media (min-width: 768px) {
    body {
        padding-top: 150px;
    }
}

h1 {
    font-size: 50px;
}

article {
    display: block;
    text-align: left;
    max-width: 650px;
    margin: 0 auto;
}

a {
    color: #dc8100;
    text-decoration: none;
}

a:hover {
    color: #efe8e8;
    text-decoration: none;
}
</style>