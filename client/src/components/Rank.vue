<template>
    <div id="rank">
        <div class="p-2 text-left text-dark mt-1" v-for="(items,index) in content" :key="index">
            <router-link :to="{name:'singlerank',params:{url:items.songurl}}">
                <img :src="items.url" alt="" class="float-left mt-1">
                <h6 class="text-center font-weight-bold">{{items.title}}</h6>
                <ul v-for="(item,index) in items.song" :key="index">
                    <li class="text-dark mt-3"><span class="pl-1">{{index+1}}</span><span class="pl-2">{{item}}</span></li>
                </ul>
            </router-link>
        </div>
        <label class="text-muted small">欢迎使用</label>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:"rank",
    data(){
        return{
            content:[
                {
                    title:'巅峰榜·流行指数',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_4_300_107541999.jpg?max_age=2592000',
                    songurl:'',
                    song:[
                        '丑八怪 - 薛之谦',
                        '房间(新版) - 刘瑞琦',
                        '讲真的 - 曾惜'
                    ]
                },
                {
                    title:'巅峰榜·热歌',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_26_300_213942399.jpg?max_age=2592000',
                    songurl:'v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=2018_20&topid=26&type=top&song_num=30',
                    song:[
                        '肆无忌惮 - 薛之谦',
                        '不爱我就拉倒 - 周杰伦',
                        'Dura - Daddy Yankee'
                    ]
                },
                {
                    title:'巅峰榜·新歌',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_27_300_213942399.jpg?max_age=2592000',
                    songurl:'',
                    song:[
                        '肆无忌惮 - 薛之谦',
                        '超级喜欢你 - 金南岭',
                        '不爱我就拉倒 - 周杰伦'
                    ]
                },
                {
                    title:'巅峰榜·网络歌曲',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_28_300_213479474.jpg?max_age=2592000',
                    songurl:'v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=2018_20&topid=28&type=top&song_num=30',
                    song:[
                        '9277 - 深七',
                        '9277 - 周晏伊',
                        '学猫叫 - 小潘潘/小峰峰'
                    ]
                },
                {
                    title:'巅峰榜·内地',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_5_300_213942399.jpg?max_age=2592000',
                    songurl:'v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=2018_20&topid=5&type=top&song_num=30',
                    song:[
                        '肆无忌惮 - 薛之谦',
                        '不安 - 庄心妍',
                        '初恋的地方 - 张信哲'
                    ]
                },
                {
                    title:'巅峰榜·港台',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_6_300_213922043.jpg?max_age=2592000',
                    songurl:'v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=2018_20&topid=6&type=top&song_num=30',
                    song:[
                        '不爱我就拉倒 - 周杰伦',
                        '新写的旧歌 - 李宗盛',
                        '初恋的地方 - 张信哲'
                    ]
                },
                {
                    title:'巅峰榜·欧美',
                    url:'https://y.gtimg.cn/music/common/upload/iphone_order_channel/toplist_3_300_213907427.jpg?max_age=2592000',
                    songurl:'v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=2018_20&topid=3&type=top&song_num=30',
                    song:[
                        'Ignite - K-391',
                        'StartAgain-OneRepublic',
                        'Solo - Clean Bandit'
                    ]
                }
            ]
        }
    },
    created(){
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth()+1>9?time.getMonth()+1:'0'+(time.getMonth()+1)
        let date = time.getDate()>9?time.getDate():'0'+time.getDate()
        this.content[0].songurl = `v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=${year}-${month}-${date}&topid=4&type=top&song_num=30`
        this.content[2].songurl = `v8/fcg-bin/fcg_v8_toplist_cp.fcg?date=${year}-${month}-${date}&topid=27&type=top&song_num=30`
    }
}
</script>

<style scoped>
*{
    margin:0;
}
img{
    width:32%;
    height:32%;
}
ul li{
    margin-left: 70px;
    list-style: none;
}
</style>
