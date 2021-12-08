<!--  -->
<template>
  <div>
    <button @click="show = true">
      {{ selectWho.data.name || '选择成员' }}
      <van-icon name="arrow-down" />
    </button>
    <van-action-sheet
      v-model:show="show"
      :round="false"
      title="搜索理财师"
      @close="closeDialog"
    >
      <div class="content">
        选择成员
        <van-search
          v-model="searchValue"
          placeholder="请输入理财师名字"
          @update:model-value="onSearch"
        />
        <div>
          <!-- 搜索结果列表 -->
          <van-cell-group>
            <div class="searchDataItem">
              <van-cell
                v-for="item in searchData.data"
                @click="selectOne(item)"
              >
                <template #title>
                  <img class="thumbAvatar" :src="item.thumbAvatar" />
                  <span class="name">{{ item.name }}</span>
                </template>
              </van-cell>
            </div>
          </van-cell-group>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script lang='ts'>
import { fetchFindPersonByAuth } from '../../../services/calendar'
import { reactive, ref } from 'vue'
import { Toast } from 'vant'
interface DataProps {}
export default {
  name: '',
  setup() {
    //   控制弹窗开关
    let show = ref(false)
    let searchValue = ref('')
    // 存储选中的人员的数据
    let selectWho = reactive({ data: [] })
    // 存储搜索出来的数据
    let searchData = reactive({ data: [] })

    // 按搜索触发回调
    const onSearch = async (val: string) => {
      const res = await fetchFindPersonByAuth({ name: val })
      if (res.code === 200 && res.data) {
        searchData.data = res.data
      } else {
        Toast('搜索失败')
      }
    }
    // 关闭弹窗触发
    const closeDialog = () => {
      searchValue.value = ''
      searchData.data = []
    }
    // 选中人员触发
    const selectOne = (e: any) => {
      selectWho.data = e
      console.log(selectWho)
      show.value = false
    }

    return {
      show,
      onSearch,
      searchData,
      closeDialog,
      selectOne,
      selectWho,
      searchValue
    }
  }
}
</script>
<style lang='less' scoped>
// 弹窗内容
.content {
  padding: 16px 16px 160px;
}
//  弹窗占屏幕百分比
:deep(.van-action-sheet) {
  height: 60%;
}
// 弹窗标题样式
:deep(.van-action-sheet__header) {
  text-align: center;
  margin-top: 18px;
  font-size: 20px;
  border-bottom: 1px solid #e8e8e8;
  color: #333333;
  font-weight: 600;
}
//  搜索结果渲染的每一项
.searchDataItem {
  //   border-bottom: 1px solid red;
  //   头像
  .thumbAvatar {
    width: 36px;
    height: 36px;
  }
  //   名字
  span {
    margin-left: 20px;
    position: absolute;
    left: 15%;
    top: 30%;
  }
}
</style>