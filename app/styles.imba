global css body
	d:flex fld:column jc:flex-start ai:center
	m:0 w:100% h:100% bg:#20222f
	ff:sans-serif fw:1
	user-select:none

global css input
	w:100% h:50px px:20px fl:1
	fs:20px ta:center
	bd:1px solid purple4
	bg:purple4/10 c:blue3 caret-color:blue3
	outline:none rd:5px

global css a
	td:none

global css .disabled *
	@important c:gray4 cursor:default user-select:none pointer-events:none

global css .disabled $main-input
	@important bg:gray4/10 bc:gray4

global css .tips
	d:flex fld:row w:100% fl:1
	c:purple4 fs:20px cursor:pointer
	fs:14px pt:15px
	jc:end ta:center
	@first jc:start ta:left
	@last jc:end ta:right

global css .tip
	d:flex fld:column bdr:1px solid blue3/10 min-width:0 fl:1 p:5px
	@last bd:none

global css .tip-hotkey
	fs:12px c:purple3/50

global css .tip-content
	pt:2px fs:14px c:purple3

global css .selected
	bg:blue3/5

global css .ellipsis
	of:hidden text-overflow:ellipsis white-space:nowrap
