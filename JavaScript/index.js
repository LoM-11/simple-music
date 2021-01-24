
        /*
            接口一: 歌曲搜索
            请求地址： https://autumnfish.cn/search
            请求方法： get
            请求参数： keywords（查询关键字）
            响应内容： 歌曲搜索结果

            接口二: 歌曲url
            请求地址：https://autumnfish.cn/song/url
            请求方法：get
            请求参数：id (歌曲id)
            响应内容：歌曲的url地址

            接口三: 歌曲详情获取
            请求地址：https://autumnfish.cn/song/detail
            请求方法：get
            请求参数：ids (歌曲id)
            响应内容：歌曲详情，包含封面信息

            接口四: 热门评论获取
            请求地址：https://autumnfish.cn/comment/hot?type=0
            请求方法：get
            请求参数：id (歌曲id,type固定为0)
            响应内容：歌曲热门评论

            接口五: MV地址获取
            请求地址：https://autumnfish.cn/mv/url
            请求方法：get
            请求参数：id (MVid,为0说明没有mv)
            响应内容：MV的地址
        */
       var app = new Vue({
        el: '#app',
        data: {
            //查询关键字
            query: '',
            // 歌曲数组
            musicList: [],
            // 歌曲地址
            songUrl: '',
            // 歌曲封面
            songImgUrl: '',
            // 歌曲评论
            songComment: [],
            // 播放状态
            isPlaying: false,
            // 遮罩层的显示状态
            isShow: false,
            // MV的url
            mvUrl: '',
            // 中间部分是否隐藏
            isCenterShow: false
        },
        // 方法
        methods: {
            // 搜索歌曲
            searchMusic(){
                var that = this;
                axios.get("https://autumnfish.cn/search?keywords=" + this.query)
                .then(function(response){
                    // console.log(response);
                    that.musicList = response.data.result.songs;
                },function(err){
                    console.log('请求失败~')
                })
            },

            // 获取歌曲url
            playerMusic(musicId){
                // 显示中间歌曲部分
                this.isCenterShow = true;
                // console.log(musicId);
                var that = this;
                axios.get("https://autumnfish.cn/song/url?id=" + musicId)
                .then(function(response){
                    // console.log(response.data.data[0].url)
                    that.songUrl = response.data.data[0].url
                },function(err){
                    console.log('歌曲url请求失败~')
                });
                
                // 获取歌曲图片
                axios.get("https://autumnfish.cn/song/detail?ids=" + musicId)
                .then(function(response){
                    // console.log(response)
                    that.songImgUrl = response.data.songs[0].al.picUrl;
                },function(err){
                    console.log('歌曲图片url请求失败~')
                });

                // 获取歌曲评论
                axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId)
                .then(function(response){
                    // console.log(response)
                    that.songComment = response.data.hotComments;
                },function(err){
                    console.log('歌曲评论请求失败~')
                });
            },

            // 控制黑胶转动
            play: function(){
                // console.log("play")
                this.isPlaying = true;
            },
            pause: function(){
                // console.log("pause")
                this.isPlaying = false;
            },

            // MV
            playMV(mvid){
                console.log("暂停！！")
                // 暂停正在播放的音乐
                this.$refs.audio.pause();
                // 获取mv
                var that = this;
                axios.get("https://autumnfish.cn/mv/url?id=" + mvid)
                .then(function(response){
                    // console.log(response)
                    that.isShow = true;
                    that.mvUrl = response.data.data.url;
                },function(err){
                    console.log('歌曲mv请求失败~')
                });
            },
            // 退出MV
            back(){
                this.isShow = false;
                this.mvUrl = '';
            }
        }
    })