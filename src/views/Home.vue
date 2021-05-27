<template>
	<h4>天韵华彩报名表</h4>
	<van-form @submit="onSubmit">
		<van-cell-group title="参赛资料">
			<van-field
				name="group"
				label="选择组别"
				placeholder="请选择组别"
				readonly
				is-link
				:arrow-direction="garrow"
				@click="setGroup"
				v-model="group"
				:rules="[{ required: true, message: '请选择组别' }]"
			/>
			<van-field
				name="name"
				label="姓名"
				placeholder="请输入姓名"
				v-model="name"
				:rules="[{ required: true, message: '请填写姓名' }]"
			/>
			<van-field
				name="guardian"
				label="监护人"
				placeholder="请输入监护人姓名"
				v-if="group === '少儿组'"
				v-model="guardian"
				:rules="[{ required: true, message: '请填写监护人姓名' }]"
			/>
			<van-field
				name="sex"
				label="性别"
				placeholder="请选择性别"
				readonly
				is-link
				:arrow-direction="arrow"
				@click="onActionSheet"
				v-model="gender"
				:rules="[{ required: true, message: '请选择性别' }]"
			/>
			<van-field
				name="id_card"
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
				name="tel"
				label="手机号"
				type="tel"
				placeholder="请输入手机号"
				v-model="mobile"
				:rules="[{ required: true, message: '请填写手机号' }]"
			/>
			<van-field
				name="qq"
				label="QQ号"
				type="number"
				placeholder="请输入QQ号"
				v-model="qqnum"
				:rules="[{ required: true, message: '请填写QQ号' }]"
			/>
			<van-field
				name="wechat"
				label="微信"
				placeholder="请输入微信"
				v-model="wxnum"
				:rules="[{ required: true, message: '请填写微信' }]"
			/>
			<van-field
				name="num"
				label="参赛人数"
				type="number"
				placeholder="请输入参赛人数"
				v-model="joinnum"
				:rules="[{ required: true, message: '请填写参赛人数' }]"
			/>
			<van-field
				name="partner"
				label="搭档选手"
				placeholder="请输入搭档选手"
				v-model="pname"
				:rules="[{ required: true, message: '请填写搭档选手' }]"
			/>
		</van-cell-group>
		<van-cell-group title="参赛内容">
			<van-field name="upload" label="照片上传">
				<template #input>
					<van-uploader
						v-model="upload"
						:after-read="afterRead"
						:before-delete="beforeDel"
					></van-uploader>
				</template>
			</van-field>
			<van-field
				name="show_name"
				label="节目名称"
				placeholder="请输入节目名称"
				v-model="show_name"
				:rules="[{ required: true, message: '请填写节目名称' }]"
			/>
			<van-field
				name="time"
				label="节目时长"
				placeholder="请输入节目时长"
				v-model="time"
				:rules="[{ required: true, message: '请填写节目时长' }]"
			/>
			<!-- <van-field name="music" label="音乐上传">
				<template #input>
					<van-uploader v-model="music" accept="audio/*">
						<van-button icon="plus" type="primary" size="small"
							>上传音乐</van-button
						>
					</van-uploader>
				</template>
			</van-field> -->
			<van-field
				name="music"
				label="参赛音乐"
				placeholder="请输入您要使用的音乐名"
				v-model="music"
				:rules="[{ required: true, message: '请填写音乐名称' }]"
			/>
			<van-field name="type" label="节目类型">
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
			<van-button
				round
				block
				type="primary"
				native-type="submit"
				:disabled="isDisable"
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
import { POSTTREEDATA, three } from '@/utils/api'
import { compressImage } from '../utils/CompressImageUtils'
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
			group: '',
			name: '',
			guardian: '',
			gender: '',
			idcard: '',
			mobile: '',
			qqnum: '',
			wxnum: '',
			joinnum: '',
			pname: '',
			show_name: '',
			time: '',
			pattern: /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
			actions: [],
			arrow: 'down',
			garrow: 'down',
			upload: [],
			uploader: [],
			music: '',
			isDisable: false
		}
	},
	methods: {
		onSubmit(e) {
			if (e.sex === '男') {
				e.sex = 1
			} else if (e.sex === '女') {
				e.sex = 2
			}
			if (e.group === '成人组') {
				e.group = 1
			} else if (e.group === '少儿组') {
				e.group = 2
			}
			e.upload = this.uploader
			this.isDisable = true
			setTimeout(() => {
				this.isDisable = false
			}, 1000)
			POSTTREEDATA(e).then(res => {
				if (res.message === '报名成功') {
					Toast.clear();
					this.$router.push('/success')
				}
			})
			/* Toast.loading({
				message: '加载中...',
				forbidClick: true,
				loadingType: 'spinner'
			})
			setTimeout(() => {
				this.$router.push('/success')
			}, 1000) */
		},
		/* 选择组别点击事件 */
		setGroup() {
			this.show = true
			this.garrow = 'up'
			this.actions = ['group', { name: '成人组' }, { name: '少儿组' }]
		},
		/* 选择性别点击事件 */
		onActionSheet() {
			this.show = true
			this.arrow = 'up'
			this.actions = ['gender', { name: '男' }, { name: '女' }]
			/* three().then(res => {
				console.log(res)
			}) */
		},
		onSelect(item) {
			// 默认情况下点击选项时不会自动收起
			// 可以通过 close-on-click-action 属性开启自动收起
			this.show = false
			this.arrow = 'down'
			this.garrow = 'down'
			if (this.actions[0] === 'gender') {
				this.gender = item.name
			} else {
				this.group = item.name
			}
			Toast(item.name)
		},
		onCancel() {
			// 默认情况下点击选项时不会自动收起
			// 可以通过 close-on-click-action 属性开启自动收起
			this.show = false
			this.arrow = 'down'
			this.garrow = 'down'
		},
		//读取完图片后
		afterRead(file) {
			console.log('afterRead------', file)
			this._compressAndUploadFile(file)
		},
		//压缩图片上传
		_compressAndUploadFile(file) {
			compressImage(file.content).then(result => {
				result.name = file.file.name
				console.log('压缩后的结果', result) // result即为压缩后的结果
				console.log('压缩前大小', file.file.size)
				console.log('压缩后大小', result.size)
				var obj = {}
				if (result.size > file.file.size) {
					console.log('上传原图')
					//压缩后比原来更大，则将原图上传
					obj.content = file.content
					obj.name = file.file.name
					obj.size = file.file.size
					obj.type = file.file.type
				} else {
					//压缩后比原来小，上传压缩后的
					console.log('上传压缩图')
					obj.content = result.content
					obj.name = result.name
					obj.size = result.size
					obj.type = result.type
				}
				this.uploader.push(obj)
			})
		},
		// 图片删除前的处理事件
		beforeDel(detail) {
			const index = detail.index
			this.uploader.splice(index, 1)
			this.upload.splice(index, 1)
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
