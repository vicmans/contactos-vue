<template>
  <div class="loaeder">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>
<style scoped>
.loaeder {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.loaeder div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--color-heading);
  border-radius: 50%;
  animation: loaeder 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--color-heading) transparent transparent transparent;
}
.loaeder div:nth-child(1) {
  animation-delay: -0.45s;
}
.loaeder div:nth-child(2) {
  animation-delay: -0.3s;
}
.loaeder div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes loaeder {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
