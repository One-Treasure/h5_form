<template>
	<h4>天运华彩成人组报名表</h4>
	<van-form @submit="onSubmit">
		<van-cell-group title="参赛资料">
			<van-field
				name="姓名"
				label="姓名"
				placeholder="请输入姓名"
				v-model="name"
				:rules="[{ required: true, message: '请填写姓名' }]"
			/>
			<van-field
				name="性别"
				label="性别"
				placeholder="请选择性别"
				readonly
				is-link
				:arrow-direction="arrow"
				@click="onActionSheet"
				v-model="gender"
				:rules="[{ required: true }]"
			/>
			<van-field
				name="身份证号码"
				label="身份证号码"
				placeholder="请输入身份证号码"
				v-model="idcard"
				:rules="[
					{
						required: true,
						pattern,
						message: '请填写正确的身份证号码'
					}
				]"
			/>
			<van-field
				name="手机号"
				label="手机号"
				type="tel"
				placeholder="请输入手机号"
				v-model="mobile"
				:rules="[{ required: true, message: '请填写手机号' }]"
			/>
			<van-field
				name="QQ号"
				label="QQ号"
				type="number"
				placeholder="请输入QQ号"
				v-model="qqnum"
				:rules="[{ required: true, message: '请填写QQ号' }]"
			/>
			<van-field
				name="微信"
				label="微信"
				placeholder="请输入微信"
				v-model="wxnum"
				:rules="[{ required: true, message: '请填写微信' }]"
			/>
			<van-field
				name="参赛人数"
				label="参赛人数"
				type="number"
				placeholder="请输入参赛人数"
				v-model="joinnum"
				:rules="[{ required: true, message: '请填写参赛人数' }]"
			/>
			<van-field
				name="搭档选手"
				label="搭档选手"
				placeholder="请输入搭档选手"
				v-model="pname"
				:rules="[{ required: true, message: '请填写搭档选手' }]"
			/>
		</van-cell-group>
		<van-cell-group title="参赛内容">
			<van-field name="upload" label="图片上传">
				<template #input>
					<van-uploader v-model="uploader"></van-uploader>
				</template>
			</van-field>
			<van-field
				name="节目名称"
				label="节目名称"
				placeholder="请输入节目名称"
				v-model="name"
				:rules="[{ required: true, message: '请填写节目名称' }]"
			/>
			<van-field
				name="节目时长"
				label="节目时长"
				placeholder="请输入节目时长"
				v-model="name"
				:rules="[{ required: true, message: '请填写节目时长' }]"
			/>
			<van-field name="music" label="音乐上传">
				<template #input>
					<van-uploader v-model="music">
						<van-button icon="plus" type="primary" size="small"
							>上传音乐</van-button
						>
					</van-uploader>
				</template>
			</van-field>
			<van-field
				name="姓名"
				label="姓名"
				placeholder="请输入姓名"
				v-model="name"
				:rules="[{ required: true, message: '请填写姓名' }]"
			/>
			<van-field name="radio" label="节目类型">
				<template #input>
					<van-radio-group v-model="checked" direction="horizontal">
						<van-radio name="1">走秀</van-radio>
						<van-radio name="2">歌舞</van-radio>
						<van-radio name="3">器乐</van-radio>
						<van-radio name="4">其他</van-radio>
					</van-radio-group>
				</template>
			</van-field>
		</van-cell-group>
		<van-cell-group title="其他注意事项">
			<div class="other-care">
				<p align="left">注：</p>
				<p align="left">1.表演时请勿遮挡号牌，以便评委打分。</p>
				<p align="left">
					2.参赛选手请自行准备服装道具，国风短剧人数十人以内。
				</p>
				<p align="left">3.提交报名表时还需最少提交一张汉服照</p>
				<p align="left">4.疫情防控期间请大家自觉佩戴口罩</p>
				<p align="left">
					5.本次国风大赛份走秀、才艺两个赛道，各赛道之间互不冲突，可重复报名
				</p>
			</div>
		</van-cell-group>
		<div style="margin: 16px">
			<van-button round block type="primary" native-type="submit"
				>提交</van-button
			>
		</div>
	</van-form>
	<van-action-sheet
		v-model:show="show"
		:actions="actions"
		cancel-text="取消"
		@cancel="onCancel"
		@select="onSelect"
		@close="onCancel"
	/>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import { GETTREEDATA, three } from '@/utils/api'
export default {
	components: {
		Toast,
		ref
	},
	setup() {
		const checked = ref('1')
		return { checked }
	},
	data() {
		return {
			show: false,
			name: '',
			gender: '',
			idcard: '',
			mobile: '',
			qqnum: '',
			wxnum: '',
			joinnum: '',
			pname: '',
			pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
			actions: [{ name: '男' }, { name: '女' }],
			arrow: 'down',
			uploader: [],
			music: []
		}
	},
	methods: {
		onSubmit() {},
		onActionSheet() {
			this.show = true
			this.arrow = 'up'
			three().then(res=>{
				console.log(res);
			})
		},
		onSelect(item) {
			// 默认情况下点击选项时不会自动收起
			// 可以通过 close-on-click-action 属性开启自动收起
			this.show = false
			this.arrow = 'down'
			this.gender = item.name
			Toast(item.name)
		},
		onCancel() {
			// 默认情况下点击选项时不会自动收起
			// 可以通过 close-on-click-action 属性开启自动收起
			this.show = false
			this.arrow = 'down'
		}
	}
}
</script>

<style>
.other-care {
	font-size: 15px;
	padding: 15px;
}
.other-care p {
	margin: 0;
}
</style>
