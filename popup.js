/**
 * 目的：封装一个弹出框的对象
 * 版式：两个按钮【确定】【取消】+ 提示信息内容
 * 时间：2018年1月14日
 */
(function(){
	var popupobj = function(){

		//显示组件
		this.showPopup = function(_data){
			//创建按钮
			var orderBtnCompo = createComponent({
				tag: 'div',//btn
				style: {
					position: 'absolute',
					width: '240px',
					height: '58px',
					textAlign: 'center',
					lineHeight: '58px',
					fontSize: '28px',
					backgroundColor: '#fff',
					color:'#797979'
				}
			},function(__parent){
				this.parent = __parent;
				this.appendTo(__parent.DOM);
			});
			orderBtnCompo.prototype.toggleFocus = configToggle({
				on: function() {
					this.configDOMStyle({
						backgroundColor: '#FFB400',
						color:'#000'
					});
				},
				off: function() {
					this.configDOMStyle({
						backgroundColor: '#fff',
						color:'#797979'
					});
				}
			});

			//创建背景+按钮
			var orderPopupCompo = createComponent({
				tag: 'div',//全屏div
				style: {
					position: 'absolute',
					top: '0px',
					width: '1280px',
					height: '720px',
					zIndex: '5',
					backgroundColor: 'rgba(0, 0, 0, 0.5)'
				}
			},function(){
				this.render('<div id="tips" style="width:480px;height:242px;position:absolute;top:164px;left:350px;background:#ffffff;border-bottom:1px solid #797979;">'+
					'<div id="title" style="width:480px;height:52px;line-height:70px;position:absolute;top:10px;left:0px;text-align:center;fontSize:28px;color:#000000;">'+'对不起，预约冲突！'+'</div>'+
					'<div id="content" style="width:480px;height:180px;line-height:180px;position:absolute;top:62px;left:0px;fontSize:22px;color:#797979;text-align:center;">'+
					'<div style="position:relative;top:20px;hieght:45px;line-height:45px;">您好，您当前预约的节目与</div>'+
					'<div style="position:relative;top:20px;hieght:45px;line-height:45px;" class="chanInfo">深圳卫视高清 12:23 你的我的那个夏天</div>'+
					'<div style="position:relative;top:20px;hieght:45px;line-height:45px;">时间冲突，是否继续预约？</div>'+
					'</div>'+
					'</div>');
				this.items = [];
				this.chanInfo = $('.chanInfo',this.DOM)[0];
				for(var i=0;i<2;i++){
					this.items.push(new orderBtnCompo(this));
				}
				this.items[0].configDOMStyle({
					top: '407px',
					left: '350px',
					borderBottomLeftRadius: '6px'
				});
				
				this.items[1].configDOMStyle({
					top: '407px',
					left: '590px',
					borderBottomRightRadius: '6px'
				});
				this.items[0].DOM.innerText = '预约';
				this.items[1].DOM.innerText = '取消';
				//this.chanInfo.innerHTML = _data.aa+'&nbsp;&nbsp'+_data.bb+'&nbsp;&nbsp'+_data.cc;
				this.chanInfo.innerHTML = _data.chnl_name+'&nbsp;&nbsp'+changeToDate(_data.start_time)+'&nbsp;&nbsp'+_data.event_name;
				this.focusNum = 0;
				this.min = 0;
				this.max = 2;
				this.appendTo(document.body);
			});

			orderPopupCompo.prototype.turnOn = function() {
				this.changeFocus(0, true);
				this.toggle('on');
			};

			orderPopupCompo.prototype.turnOff = function() {
				this.toggle('off');
			};

			orderPopupCompo.prototype.toggleFocus = function() {
				publicToggleFocus.apply(this, arguments);
			};

			orderPopupCompo.prototype.changeFocus = function() {
				publicChangeFocus.apply(this, arguments);
			};

			orderPopupCompo.prototype.doSelect = function() {
				// iDebug("doSelect----focusNum="+this.focusNum);
				// switch (this.focusNum) {
				// 	case 0:
				// 		iDebug("doSelect----预约");
				// 		break;
				// 	case 1:
				// 		iDebug("doSelect----取消");
				// 		this.turnOff();
				// 		break;
				// }
			};
			orderCompo = new orderPopupCompo();
			orderCompo.turnOn();//初始化
		};

		/**
		 *隐藏组件
		 * @param  {[obj]} _data [组件隐藏内容]
		 *
		 */
		this.hidePopup = function(_data){
			orderCompo.turnOff();
		};
	};

	/**
	 * 组件对象通用焦点开关
	 */
	function publicToggleFocus(__key) {
		if (this.items[this.focusNum]) {
			this.items[this.focusNum].toggleFocus(__key);
		}
	};

	/**
	 * 组件对象通用形的焦点移动方法
	 * @param  {Number} __num      焦点移动数，如果第二个参数为true时，则为焦点指定位置
	 * @param  {Boolean} __specific 是否设置焦点至指定位置
	 */
	function publicChangeFocus(__num, __specific) {
		var focusNum = 0;
		if (__specific) {
			focusNum = __num;
		} else {
			focusNum = this.focusNum + __num;
		}
		focusNum = limitNum(focusNum, this.max - 1, this.min);
		// 先失焦再聚焦，由于有可能存在区域切换的情况，所以不做焦点前后相同中断的判断
		this.toggleFocus('off');
		this.focusNum = focusNum;
		this.toggleFocus('on');
	};

	/**
	 * 限制数值在有效范围内的方法
	 * @param  {Number} __num 传入的数值
	 * @param  {Number} __max 最大值
	 * @param  {Number} __min 最小值
	 * @return {Number}       限制后的数值
	 */
	function limitNum(__num, __max, __min) {
		var num = __num;

		num = Math.min(num, __max);
		num = Math.max(num, __min);
		return num;
	};

	/**
	 * 仿照jQuery $实现的选取DOM对象的方法，未考虑兼容3.0
	 * @param  {String} __str   选取使用的字符串
	 * @param  {Object} __DOM   DOM对象，如果没有则默认为document
	 * @return {Object}         选取到的DOM对象
	 */
	function $(__str, __DOM, __cache) {
        var str = '',
            DOM = __DOM || document,
            res = null;

        // 如果有缓存，取缓存数据
        // #: id; .: className; tagName;
	    if (__str.indexOf('#') == 0) {
	        str = __str.split('#')[1];
	        res = DOM.getElementById(str);
	    } else if (__str.indexOf('.') == 0) {
	        str = __str.split('.')[1];
	        res = DOM.getElementsByClassName(str);
	    } else {
	        res = DOM.getElementsByTagName(__str);
	    }

        return res;
    };

	/**
	 * 样式组件构造函数
	 * @param {Object} __param 参数对象
	 */
	function Component(__param) {
		// 传入已有的DOM对象来生成组件
		if (__param.DOM) {
			this.DOM = __param.DOM
		} else if (__param.tag) {
			// 全新生成DOM
			this.tag = __param.tag;
			this.DOM = document.createElement(this.tag);
			// 如果传入了样式参数，设置DOM对象的样式
			if (__param.style) {
				this.configDOMStyle(__param.style);
			}
		}
		// 如果传入了组件名字，则设置名字
		if (__param.compoName) {
			this.compoName = __param.compoName;
		}
	};

	// 组件对象的方法
	/**
	 * 渲染innerHTML
	 * @param  {String} __HTML HTML字符串
	 */
	Component.prototype.render = function(__HTML) {
	    this.DOM.innerHTML = __HTML;
	};

	/**
	 * 添加到其它DOM对象的方法
	 * @param  {Object} __DOM 被添加本DOM的对象
	 */
	Component.prototype.appendTo = function(__DOM) {
	    __DOM.appendChild(this.DOM);
	};

	/**
	 * 设置自身DOM对象样式的方法
	 * @param  {Object} __param 参数对象
	 */
	Component.prototype.configDOMStyle = function(__param) {
	    for (var prop in __param) {
	        this.DOM.style[prop] = __param[prop];
	    }
	};

	/**
	 * 组件显示开关
	 */
	Component.prototype.toggle = function(__key) {
	    if (__key == 'on') {
	        this.configDOMStyle({display: ''});
	    } else if (__key == 'off') {
	        this.configDOMStyle({display: 'none'});
	    }
	};

	/**
	 * 快速创建新组件构造函数的方法
	 * @return {Function} 组件的构造函数
	 */
	function createComponent(__arguments, __callback) {
		var args = __arguments,
			callback = __callback || function() {};

		function F() {
			Component.apply(this, [args]);
			callback.apply(this, arguments);
		}
		inherit(Component, F);
		return F;
	};

	/**
	 * 利用原型链浅复制对象的方法
	 * @param  {Object} __obj 被复制的对象
	 * @return {Object}       生成的对象
	 */
	function createObj(__obj) {
		function F() {}
		F.prototype = __obj;
		return new F();
	};

	/**
	 * 组合继承的方法，利用原型链继承公用属性，调用父类构造函数生成独立属性
	 * @param  {Function} __obj  父类构造函数
	 * @param  {Function} __subj 子类构造函数
	 */
	function inherit(__obj, __subj) {
		var prototype = createObj(__obj.prototype);
		prototype.constructor = __subj;
		__subj.prototype = prototype;
	};

	function configToggle(__param) {
	    var before = __param.before || function() {},
	        on = __param.on || function() {},
	        off = __param.off || function() {},
	        after = __param.after || function() {};

	    return function(__key) {
	        var __self = this,
	            pass = null;

	        pass = before.apply(__self, arguments);
	        switch (__key) {
	            case 'on':
	                pass = on.apply(__self, [pass]);
	                break;
	            case 'off':
	                pass = off.apply(__self, [pass]);
	                break;
	        }
	        pass = after.apply(__self, [pass]);
	        return;
	    }
	};

	/**
	 * 添加打印
	 * @param  {[str]} str [需要打印的内容]
	 *
	 */
	function iDebug(str){
		if(navigator.appName.indexOf("iPanel") != -1){
			iPanel.debug("[popup.js]----"+str);
		}else if(navigator.appName.indexOf("Opera") != -1){
			opera.postError("[popup.js]----"+str);
		}else if(navigator.appName.indexOf("Netscape") != -1 || navigator.appName.indexOf("Google") != -1){
			console.log("[popup.js]----"+str);
		}
	};

	//转换utc时间为hh:mm
	function changeToDate (utc) {
		var date 	= new Date(utc*1000);
		var year 	= date.getFullYear(),
			month	= addZero(date.getMonth()+1),
			day		= addZero(date.getDate()),
			hour	= addZero(date.getHours()),
			min		= addZero(date.getMinutes()),
			sec		= addZero(date.getSeconds());

		return hour + ":" + min;
		//return year+"/"+month+"/"+day+"&"+hour+":"+min+":"+sec;
	}

	function addZero (num) {
		return num > 9 ? "" + num : "0" + num;
	}

	popupInstance = new popupobj();
})();