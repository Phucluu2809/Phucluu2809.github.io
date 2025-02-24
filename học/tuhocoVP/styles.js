// let data = {price: 5, quantity: 2};
// let target = null;

// // Dep không thay đổi gì so với ở trên
// class Dep {
//   constructor() {
//     // thay vì là starage, thiên hạ đã thống nhất lấy cái tên subscribers
//     this.subscribers = []; 
//   }
//   depend() {
//     if (target && !this.subscribers.includes(target)) {
//       // chỉ thêm vào nếu chưa có hoặc không trùng
//       thiss.subscribers.push(target);
//     }
//   }
//   notify() {
//     // run tất cả target, tên gọi khác là observer
//     this.subscribers.forEach(sub => sub()); 
//   }
// }

// // chạy qua từng data của property
// Object.keys(data).forEach(key => {
//   let intervalvalue = data[key];

//   // mỗi em một Dep
//   const dep = new Dep();

//   Object.defineProperty(data, key, { // chỉ cho thằng Price Property
//     get() {
//       dep.depend(); // lưu hộ tao cái
//       return internalValue;
//     },
//     set(newVal) {
//       internalvalue = newVal;
//       dep.notify();// re-run đi em
//     }
//   })
// })

// // watcher sẽ không còn gọi dep.depend nữa
// function watcher(myFunc) {
//   target = myFunc;
//   target();
//   target = null;
// }

// watcher(() => {
//   data.total = data.price * data.quantity;
// })

