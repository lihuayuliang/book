<template>
    <div className="container">
        <div id="book-pic">
            <div className="book-big">
                <img :src="book.url">
            </div>
            <span className="tip"></span>
        </div> <!-- book-pic-end -->
        <div id="book-info">
            <span className="book-name" v-text="book.bookname"></span>
            <span className="book-publish" v-text="book.bookauthor+' 著'"></span>
            <span className="book-price">
                <p>售价 <a className="final-price" v-text="'￥'+book.price"></a></p>
                <p>品相 <a className="condition" v-text="book.cond"></a></p>
            </span>
            <span className="book-descr">
                <p>上书时间<a className="upload-time" v-text="book.created"></a></p>
            </span>
            <span className="buy-now">立即联系卖家进行购买</span>
        </div> <!-- book-info-end -->
        <div id="seller-info">
            <a className="seller-name" v-text="user.nickname">DanielLin</a>
            <span className="seller-span1">
                联系<a className="seller-chat">在线联系</a>
            </span>
            <span className="seller-span2">
                <p>电话<a className="seller-num" v-text="user.phone">132-1234-1234</a></p>
                <p>宿舍<a className="seller-adr" v-text="user.location">22栋B区888</a></p>
                <p>浏览量<a className="seller-appraise" v-text="book.viewCount"></a></p>
            </span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "detail",
    data() {
        return {
            book: {},
            user: {}
        }
    },
    computed: {
        ...mapState(['user'])
    },
    created() {
        this.getBookDetail()
    },
    methods: {
        getBookDetail() {
            let id = this.$route.params.id
            axios.get('/book/detail', {
                params: {
                    id: id
                }
            }).then(res => {
                this.book = res.data.data
                this.user = res.data.user
            })
        }
    }
}
</script>

<style scoped>
.container {
    width: 1000px;
    margin: 0 auto;
    padding-top: 20px;
}

#book-pic {
    width: 300px;
    height: 400px;
    float: left;
    margin-right: 20px;
}

#book-pic .book-big {
    width: 300px;
    height: 400px;
    overflow: hidden;
}

#book-pic .book-big img {
    width: 300px;
    height: 400px;
}

#book-pic .tip {
    width: 300px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f5f5f5;
    color: #999;
    font-size: 12px;
}

#book-info {
    width: 650px;
    height: 400px;
    float: left;
}

#book-info .book-name {
    width: 650px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}

#book-info .book-publish {
    width: 650px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}

#book-info .book-price {
    width: 650px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}

#book-info .book-price .final-price {
    color: #f00;
    font-size: 18px;
}

#book-info .book-price .condition {
    color: #333;
    font-size: 18px;
}

#book-info .book-descr {
    width: 650px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    margin-bottom: 10px;
}

#book-info .book-descr .upload-time {
    color: #333;
    font-size: 18px;
}

#book-info .buy-now {
    width: 650px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #f5f5f5;
    color: #999;
    font-size: 14px;
    margin-bottom: 10px;
}

#seller-info {
    width: 1000px;
    height: 100px;
    margin-top: 20px;
}

#seller-info .seller-name {
    width: 100px;
    height: 100px;
    line-height: 100px;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    float: left;
}

#seller-info .seller-span1 {
    width: 300px;
    height: 100px;
    line-height: 100px;
    font-size: 14px;
    color: #999;
    float: left;
}

#seller-info .seller-span1 .seller-chat {
    color: #f00;
    font-size: 18px;
}

#seller-info .seller-span2 {
    width: 600px;
    height: 100px;
    line-height: 100px;
    font-size: 14px;
    color: #999;
    float: left;
}

#seller-info .seller-span2 .seller-num {
    color: #333;
    font-size: 18px;
}

#seller-info .seller-span2 .seller-adr {
    color: #333;
    font-size: 18px;
}

#seller-info .seller-span2 .seller-appraise {
    color: #333;
    font-size: 18px;
}
</style>
    
