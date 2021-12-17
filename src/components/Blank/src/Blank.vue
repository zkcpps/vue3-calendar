<template>
  <div class="blank">
    <div class="img">
      <img src="./../../../assets/images/blank.png" />
      <div class="desc">开发中...</div>
    </div>
  </div>
</template>


<style lang="less" scoped>
.blank {
  height: 100%;
  text-align: center;
  .img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    img {
      width: 180px;
      height: 120px;
    }
    .desc {
      height: 40px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
    }
  }
}
</style>
