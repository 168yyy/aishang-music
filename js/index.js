document.addEventListener('readystatechange',function(){
	if(document.readyState === 'complete'){
		var audio = document.querySelector('audio');
		var state = document.querySelector('#spanplayer_bgbar');
		var statebtn = document.querySelector('#spanprogress_op');
		var time = document.querySelector('.time_show');
		var timeshow = document.querySelector('#time_show');
		var stateline = document.querySelector('#spanplaybar');
		var btnplay = document.querySelector('#btnplay');
		var vol = document.querySelector('#spanvolume');
		var volbtn = document.querySelector('#spanvolumeop');
		
		

		//uireset
		var uireset = function(){
			//spanvolumeop.style.left = 100%;
			//spanvolumebar.style.width = 100%;
			downloadbar.style.width = 0;
			spanprogress_op.style.left = 0;
			ptime.innerHTML = '';
			audio.src = '';
			musicname.innerHTML = '<span>听我想听的歌！<span>'
			singername.innerHTML = '<span>QQ音乐</span>'
			btnplay.classList.remove('pause_bt');
			btnplay.classList.add('play_bt');

		}
		var musics = [
			{name:'暗恋过 结局呢',src:'./music/001.mp3',singer:'新街口组合',duration:'3:51'},
			{name:'归还',src:'./music/002.mp3',singer:'冷子夕',duration:'4:18'},
			{name:'安徒生剧本',src:'./music/003.mp3',singer:'蒋蒋',duration:'3:54'},
			{name:'一万次悲伤',src:'./music/004.mp3',singer:'逃跑计划',duration:'4:17'}
		];
		//player
		divplayer.style.left ='-540px';
		
		btnfold.onclick = function(){
			if (divplayer.style.left == '0px') {
				divplayer.style.left = '-540px'
				this.title = '点击展开'
				divplayer.classList.add('m_player_folded')
				divplayer.classList.add('m_player_playing')
			}else{
				divplayer.style.left = 0
				this.title = '点击收起'
				divplayer.classList.remove('m_player_folded')
				divplayer.classList.remove('m_player_playing')
			}
		}

		var mute = document.querySelector('#spanmute');
		var volline = document.querySelector('#spanvolumebar');
		var divsonglist = document.querySelector('#divsonglist');
		var musicname = document.querySelector('.music_name');
		var singername = document.querySelector('.singer_name');
		var ptime = document.querySelector('#ptime');
		var spansongnum1 = document.querySelector('#spansongnum1');
		var prevbt = document.querySelector('.prev_bt');
		var nextbt = document.querySelector('.next_bt');
		var musicop = document.querySelector('.music_op');
		//歌曲列表
		var createlist = function(){
			var song = '';
			//展开播放列表
			spansongnum1.innerHTML = '<span>'+musics.length+'</span>'
			spansongnum1.onclick = function(){
				if(divplayframe.style.display == 'block'){
					divplayframe.style.display = 'none';
				}else{
					divplayframe.style.display = 'block';
				}
			}
			if(musics.length === 0){
				divsonglist.firstElementChild.innerHTML = '';
			}else{
				for (var i = 0; i < musics.length; i++) {
					var sl = (i === songindex)?'play_current':'';
					song += '<li data-index="'+i+'"class="'+sl+'"><strong class="music_name" title="'+musics[i].name+'">'+musics[i].name+'</strong><strong class="singer_name" title="'+musics[i].singer+'">'+musics[i].singer+'</strong><strong class="play_time">'+musics[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_000Nz08A0aZNuz" mid="000Nz08A0aZNuz"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
					divsonglist.firstElementChild.innerHTML = song;
				}
			}
		}
		createlist();

		//清空列表
		var btndel;
		clear_list.onclick = function(){
			musics = [];
			uireset();
			createlist();
		}
		var delsong = function(){
			btndel = document.querySelectorAll('.btn_del');
			for(var i = 0;i < btndel.length;i++){
				btndel[i].index = i;
				btndel[i].onclick = function(ev){
					ev.stopPropagation();
					if(songindex > this.index){
						songindex -=1;
					}else if(songindex == this.index){
						if(songindex != musics.length-1){
							audio.src = musics[songindex+1].src;
							audio.play();
							musicname.innerHTML = musics[songindex+1].name;
							musicname.title = musics[songindex+1].name;
							singername.innerHTML = musics[songindex+1].singer;
							singername.title = musics[songindex+1].singer;
							ptime.innerHTML = musics[songindex+1].duration;
						}else if(songindex == musics.length-1 && songindex !=0){
							songindex = 0;
							audio.src = musics[0].src;
							audio.play();
							musicname.innerHTML = musics[0].name;
							musicname.title = musics[0].name;
							singername.innerHTML = musics[0].singer;
							singername.title = musics[0].singer;
							ptime.innerHTML = musics[0].duration;
						}else{
							audio.src = '';
							uireset();
						}
					}
					var newlist = [];
					for(var j = 0;j < musics.length;j++){
						if(musics[this.index] != musics[j]){
							newlist.push(musics[j]);
						}
					} 
					musics = newlist;
					createlist();
					songlists();
				}
			}
		}
		delsong();

		//歌曲列表播放
		var songindex;
		var songlist;
		var songlists = function(){
			songlist = divsonglist.firstElementChild.children;
			for(var i = 0; i < songlist.length; i++){
				songlist[i].index = i;
				songlist[i].onclick = function(){
					songindex = this.index;
					onsongchange();
					audio.play();
				}
				songlist[i].onmouseover = function(){
					for(var i = 0; i <songlist.length; i++){
						songlist[i].classList.remove('play_hover');
					}
					this.classList.add('play_hover');
				}
				songlist[i].onmouseout = function(){
					for(var i = 0; i <songlist.length; i++){
						songlist[i].classList.remove('play_hover');
					}
				}
			}
			delsong();
		}
		songlists();
		var onsongchange = function(){
			for(var i = 0; i <songlist.length; i++){
				songlist[i].classList.remove('play_current');
			}
			audio.src = musics[songlist[songindex].getAttribute('data-index')].src;
			songlist[songindex].classList.add('play_current');
			musicname.innerHTML = musics[songindex].name;
			musicname.title = musics[songindex].name;
			singername.innerHTML = musics[songindex].singer;
			singername.title = musics[songindex].singer;
			ptime.innerHTML = musics[songindex].duration;
			musicop.style.display = 'block';
		}

		//下一首
		nextbt.onclick = function(){
			if(playway === UNORDERED){
				random();
			}else{
				next();
			}
		}
		var next = function(){
			if(songindex === undefined){
				return;
			}else{
				songindex = (songindex == musics.length-1)?0:songindex+=1;
				onsongchange();
				audio.play();
			}
		}

		//上一首
		prevbt.onclick = function(){
			if(playway === UNORDERED){
				random();
			}else{
				prev();
			}
		}
		var prev = function(){
			if(songindex === undefined){
				return;
			}else{
				songindex = (songindex === 0)?musics.length-1:songindex-=1;
				onsongchange();
				audio.play();
			}
		}

		//播放
		btnplay.onclick = function(){
			if(audio.paused){
				audio.play();
			}else{
				audio.pause();
			}
		}
		audio.onplay = function(){
			btnplay.classList.remove('play_bt');
			btnplay.classList.add('pause_bt');
		}
		audio.onpause = function(){
			btnplay.classList.remove('pause_bt');
			btnplay.classList.add('play_bt');
		}

		//音量控制
		vol.onclick = function(ev){
			audio.volume = ev.offsetX/vol.offsetWidth;
		}
		mute.onclick = (function(){
			var oldvol;
			return function(){
				if(audio.volume !== 0){
					oldvol = audio.volume;
					audio.volume = 0;
				}else{
					audio.volume = oldvol;
				}
			} 
		})();
		audio.onvolumechange = function(){
			if(audio.volume === 0){
				mute.classList.remove('volume_icon');
				mute.classList.add('volume_mute');

			}else{
				mute.classList.remove('volume_mute');
				mute.classList.add('volume_icon');
			}
			var le = vol.offsetWidth*audio.volume - volbtn.offsetWidth/2;
			volbtn.style.left = le + 'px';
			volline.style.width = vol.offsetWidth*audio.volume + 'px';

		}
		volbtn.onclick = function(ev){
			ev.stopPropagation();
		}

		//进度条控制
		state.onclick = function(ev){
			audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}
		spanplaybar.onclick = function(ev){
			audio.currentTime = audio.duration*ev.offsetX/state.offsetWidth;
		}
		statebtn.onclick = function(ev){
			ev.stopPropagation();
		}
		audio.ontimeupdate = function(){
			var ste = state.offsetWidth * (audio.currentTime/audio.duration) - statebtn.offsetWidth/2;
			statebtn.style.left = ste + 'px';
			stateline.style.width = state.offsetWidth * (audio.currentTime/audio.duration) + 'px';
			if(audio.ended){
				if(playway === CYCLE){
					next();
				}else if(playway === ORDERED){
					if(songindex !== musics.length-1){
						next();
					}
				}else if(playway === UNORDERED){
					random();
				}
			}
		}

		//进度条悬浮显示
		var zhuanhuan = function(a){
			if(a > 0){
				var az = parseInt(a);
				var min = parseInt(az/60);
				var s = az%60;
				return min+':'+s;
			}else{
				return '0:0';
			}
		}
		state.onmouseover = spanplaybar.onmouseover = function(ev){
			time.style.display = 'block';
			var timepoint = audio.duration*ev.offsetX/state.offsetWidth;
			timeshow.innerHTML = zhuanhuan(timepoint);
			time.style.left = ev.offsetX - time.offsetWidth/2 + 'px';
		}
		statebtn.onmouseover = function(ev){
			ev.stopPropagation();
		}
		state.onmousemove = spanplaybar.onmousemove = function(ev){
			var timepoint = audio.duration*ev.offsetX/state.offsetWidth;
			timeshow.innerHTML = zhuanhuan(timepoint);
			time.style.left = ev.offsetX - time.offsetWidth/2 + 'px';
		}
		state.onmouseout = function(ev){
			time.style.display = 'none';
		}

		//循环模式
		var CYCLE_SINGLE = 1,ORDERED = 2,CYCLE = 3,UNORDERED = 4;
		var playway = CYCLE;
		btnPlayway.onclick = function(){
			divselect.style.display = 'block';
		}
		playmode = function(num){
			playway = num;
			//1=>单曲 2=>顺序 3=>列表 4=>随机
			if(playway === CYCLE_SINGLE){
				audio.loop = true;
			}else{
				audio.loop = false;
			}
			var data = [
				{classname:'cycle_single_bt',modename:'单曲循环'},
				{classname:'ordered_bt',modename:'顺序播放'},
				{classname:'cycle_bt',modename:'列表循环'},
				{classname:'unordered_bt',modename:'随机播放'}
			]
			btnPlayway.className = data[num-1].classname;
			btnPlayway.innerHTML = '<span>'+data[num-1].modename+'</span>'
			btnPlayway.title = data[num-1].modename;
			divselect.style.display = 'none';
		}
		var random = function(){
			var oldindex = songindex;
			songindex = Math.floor(Math.random()*musics.length);
			while(oldindex === songindex){
				songindex = Math.floor(Math.random()*musics.length);
			}
			onsongchange();
			audio.play();
		}
	}
},false)