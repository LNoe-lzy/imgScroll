;(function (window) {
    window.Scroll = Scroll;
    // @param {Object} elem 传入图像的包裹节点
    // @param {Number} width 传入图片的宽
    // @param {Number} nums 传入图片的数量

    function Scroll(elem, width, nums, config) {
        this.elem = elem;
        this.width = width;
        this.nums = nums;
        // speed: 图片每次滑动的速度; scrollInterval: 图片每次滑动的时间间隔; imgInterval: 图片切换的时间间隔
        this.config = config || {speed: 10, scrollInterval: 20, imgInterval: 1000};

        this.animated = false;
        this.index = 1;
        this.timer = 0;
    }
    // @param {boolean} flag 设定图像的滚动方向
    Scroll.prototype.animate = function (flag) {
        // 避免用户的恶意多次点击
        if (!this.animated) {
            var that = this;
            // 图片包裹区的总宽度
            var l = this.width * this.nums;
            var w = this.width;
            var n = this.nums;
            var e = this.elem;
            var timer = setInterval(function () {
                var speed = that.config.speed;
                var pos = parseInt(e.style['left']);
                // 计算每一次的偏移量
                var tmp = flag ? pos + w * (that.index + 1) : pos + w * (that.index - 1);
                // 计算新位置
                var newPos = flag ?  Math.floor(pos - tmp / speed) : Math.ceil(pos - tmp / speed);
                e.style['left'] = newPos + 'px';
                if (parseInt(e.style['left']) % w === 0) {
                    that.animated = false;
                    clearInterval(timer);
                    if (flag) {
                        that.index ++;
                        if (newPos < -l) {
                            that.index = 1;
                            e.style['left'] = -w + 'px';
                        }
                    } else {
                        that.index --;
                        if (newPos > -w) {
                            that.index = n;
                            e.style['left'] = -l + 'px';
                        }
                    }
                }
            }, that.config.scrollInterval);
            this.animated = true;
        }
    };

    Scroll.prototype.play = function () {
        var that = this;
        this.timer = setInterval(function () {
            that.animate(true);
        }, that.config.imgInterval);
    };

    Scroll.prototype.stop = function () {
        clearInterval(this.timer);
    };
})(window);
