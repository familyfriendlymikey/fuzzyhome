global css html
	$effective-name-c:gray4
	$effective-name-parens-c:gray4/80
	bg:#20222f

global css body
	m:0 bd:0 p:0
	bg:#20222f

global css .dark
	$appbg:#20222f
	$bodybg:#20222f
	$selected-bg:blue3/3
	$hover-bg:blue3/1
	$bang-c:#fad4ab
	$text-c:blue3
	$input-bg:purple4/10
	$input-c:blue3
	$input-caret-c:blue3
	$input-bc:purple4
	$tip-hotkey-c:purple3/50
	$tip-content-c:purple3
	$tip-hover-c:purple3/3
	$tip-bc:blue3/10
	$button-c:purple3/90
	$button-dim-c:purple3/50
	$button-bg:purple4/10
	$button-hover-bg:purple4/20

global css .light
	$bodybg:#ececec
	$appbg:#fff
	$selected-bg:blue5/7
	$hover-bg:blue5/2
	$bang-c:#ff7070
	$text-c:#3c3c3c
	$input-bg:blue4/10
	$input-c:blue3
	$input-caret-c:#3c3c3c
	$input-bc:blue4
	$tip-hotkey-c:blue4/80
	$tip-content-c:blue5
	$tip-hover-c:black/3
	$tip-bc:black/10
	$button-c:blue5/90
	$button-dim-c:blue5/50
	$button-bg:blue4/10
	$button-hover-bg:blue4/20

global css a
	td:none

global css .disabled *
	@important c:gray4 user-select:none pointer-events:none

global css .disabled
	@important bg:gray4/10 bc:gray4

global css input
	bg:none h:50px px:20px fl:1 e:300ms
	fs:20px ta:center
	bd:1px solid $input-bc
	outline:none rd:5px
	c:$text-c
	caret-color:$input-caret-c
	@focus
		bg:$input-bg

global css button
	bg:none bd:none fs:14px d:box fl:1 rd:5px
	transition:background 100ms
	h:100% px:5px
	of:hidden text-overflow:ellipsis white-space:nowrap
	bg:$button-bg c:$button-c
	@hover bg:$button-hover-bg

global css .selected
	bg:$selected-bg

global css .ellipsis
	of:hidden text-overflow:ellipsis white-space:nowrap

global css .button-row
	d:flex fld:row jc:space-around ai:center
	w:100% h:50px mt:10px g:10px
