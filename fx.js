var mv = function() {
    //刷新屏幕前执行回调函数
    var redraw =window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function(callback) {
                    return setTimeout(callback, 1000 / 60);
                },
        //取消下次刷新屏幕前回调函数的执行
        undraw =window.cancelAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.msCancelAnimationFrame ||
                window.oCancelAnimationFrame ||
                window.mozCancelAnimationFrame ||
                clearTimeout,
        //获取当前元素的样式
        getStyle = function(obj, name) {
            return window.getComputedStyle ? getComputedStyle(obj, false)[name] : obj.currentStyle[name];
        },
        //运动
        /**
         * [fx description]
         * @param  {[type]} obj     [运动的目标元素]
         * @param  {[type]} json    [运动的目标位置]
         * @param  {[type]} options [运动的参数配置]
         * @return {[type]}         [description]
         */
        mv = function(obj, json, options) {
            //缺省设置
            options = options || {};
            options.time = options.time || 300;
            options.type = options.type || 'ease-out';
            options.fps=options.fps||60;
            //计算步数
            var start = {};
            var dis = {};
            var count = Math.round(options.time / 30);
            var n = 0;
            
            //本帧时间
            var now=Date.now(),
            //上一帧时间
                then=Date.now(),
                interval=1000/options.fps,
                delta,
                framesNum=options.time/interval;
            //取起点，算距离
            for (var i in json) {
                start[i] = parseFloat(getStyle(obj, i));
                console.log(start[i])
                dis[i] = parseInt(json[i]) - start[i];
                console.log(dis[i])
            }


            function cal(){//计算每一帧的位置
                n++;
                for(var i in json){
                    switch(options.type){
                        case 'linear':
                            var cur=start[i]+dis[i]*n/framesNum;
                            break;
                        case 'ease-in':
                            var a=n/framesNum;
                            var cur=start[i]+dis[i]*a*a*a;
                            break;
                        case 'ease-out':
                            var a=1-n/framesNum;
                            var cur=start[i]+dis[i]*(1-a*a*a);
                            break;
                    }
                    if(i=='opacity'){
                        obj.style.opacity=cur;
                        obj.style.filter='alpha(opacity:'+cur*100+')';
                    }else{
                        obj.style[i]=cur+'px';
                        console.log(cur)
                    }
                }
            }

            function tick(){//更新帧
                if(n<framesNum){
                    redraw(tick);
                }else if(n===framesNum){
                    undraw(tick);
                    (typeof options.fn==='function')&&options.fn();
                }
                now=Date.now();
                delta=now-then;
                if(delta>interval){
                    for(var i in json){
                        then=now-(delta%interval);
                        cal();//首先计算物体的新位置
                    }
                }//在屏幕刷新时再次更新帧
            };
            tick();
        }
    return mv;
}();
var it=document.querySelector('div');
var it2=document.querySelectorAll('div')[1];
// mv(it2,{
//     left:400,opacity:1
// },{
//     time:3000
// });
var redraw =window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame     ||
            window.oRequestAnimationFrame      ||
            window.mozRequestAnimationFrame    ||
            function(callback) {
                return setTimeout(callback, 1000 / 60);
            };
//取消下次刷新屏幕前回调函数的执行
var undraw =window.cancelAnimationFrame        ||
            window.webkitCancelAnimationFrame  ||
            window.msCancelAnimationFrame      ||
            window.oCancelAnimationFrame       ||
            window.mozCancelAnimationFrame     ||
            clearTimeout;
function interval(fn,n){
    var i=0;
    function loop(){
        i++;
        fn();

        if(n){
            if(i<n){
                redraw(loop)
            }
        }else{
            redraw(loop)
        }
    }
    loop();
};
interval(hhh);
function hhh(){
    console.log(3)
}