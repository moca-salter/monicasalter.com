(function($) {
  "use strict";

	// Button Ripple
	$('.js-button-ripple').on('click', function(e) {
		var target = e.target;
		var rect = target.getBoundingClientRect();
		var ripple = target.querySelector('.ripple');
		if (!ripple) {
			ripple = document.createElement('span');
			ripple.className = 'ripple';
			ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px';
			target.appendChild(ripple);
		}
		ripple.classList.remove('show');
		var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
		var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
		ripple.style.top = top + 'px';
		ripple.style.left = left + 'px';
		ripple.classList.add('show');
		return false;
	});

	// Crane
	var crane = Snap("#crane"),
	  frontWing = crane.select("#front_wing"),
	  frontWingImage = crane.select("#front_wing_image"),
	  backWing = crane.select("#back_wing"),
	  neckAndHead = crane.select("#head_and_neck"),
	  head = crane.select("#head");

	var pivots = {
		frontWing: [272.8, 194.8],
		backWing: [257.9, 120.5],
		head: [286.7, 27.7],
		neck: [276.4,181]
	}
  
	var timeouts = {
		look: 12000,
		neck: 4000,
		flap1: 1000,
		flap2: 1500,
	}
  
	var animateTimes = {
		neckLowered: 700,
		neckPaused: 2500,
		neckRaised: 600
  	}

	var theApp = {
		init: function() {
			theCrane.controls();
		}
	 },

		theCrane = {
		controls: function() {
			
			// initial motions
			theCrane.headNeckMotions();
			theCrane.wingMotions();
			
			// repeating motions
			setInterval(function() {
				theCrane.headNeckMotions();
			}, (timeouts.look + timeouts.neck) );
			setInterval(function() {
				theCrane.wingMotions();
			}, 8000);
		},
		
		headNeckMotions: function() {
			setTimeout(function() {
				theCrane.bendNeck();
				theCrane.tiltHead();
			}, timeouts.neck);
			setTimeout(function() {
				theCrane.lookAround();
			}, timeouts.look);
		},
		
		wingMotions: function() {
			setTimeout(function() {
				theCrane.flapWings(75);
			}, timeouts.flap1);
			setTimeout(function() {
				theCrane.flapWings(100);
			}, timeouts.flap2);
		},
		
		lookAround: function(){
			head.animate({
				transform: "r" + [6, pivots.head] 
			}, 900, mina.backout, function(){
			setTimeout(function() {
				head.animate({
					transform: "r" + [0, pivots.head]
				}, 500, mina.backout); 
			}, 700);
		  });
		},
		
		tiltHead: function(){
			setTimeout(function() {
			  head.animate({
				transform: "r" + [-10, pivots.head] 
			  }, animateTimes.neckLowered, mina.linear, function(){
				setTimeout(function() {
					head.animate({
						transform: "r" + [0, pivots.head]
					}, 500, mina.linear); 
				}, 700);
			  });
			}, (200));
		},
		
		bendNeck: function(){
		  neckAndHead.animate({
		  	transform: "r" + [20, pivots.neck] 
		  }, animateTimes.neckLowered, mina.linear, function(){
			setTimeout(function() {
				neckAndHead.animate({
					transform: "r" + [0, pivots.neck]
				}, animateTimes.neckRaised, mina.linear);
			}, animateTimes.neckPaused);
		  });
		},
		
		flapWings: function(speed){
		  frontWing.animate({    
			transform: "r" + [-4, pivots.frontWing]
			}, (speed + 100), mina.easeout, function(){
				setTimeout(function() {
					frontWing.animate({    
						transform: "r" + [0, pivots.frontWing]
					}, (speed + 300), mina.backout);
				}, speed);
			});
		  backWing.animate({
			transform: "r" + [-3, pivots.backWing]
			}, (speed + 110), mina.easeout, function(){
				setTimeout(function() {
					backWing.animate({    
						transform: "r" + [0, pivots.backWing]
				}, (speed + 300), mina.backout);
			}, speed);
		  })
		}
	};

	$(document).ready(function() {
		theApp.init();
	});

}(this.jQuery));