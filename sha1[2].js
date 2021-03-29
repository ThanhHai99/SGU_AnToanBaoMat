// SHA1 (cit)
let sha1 = () => {
    console.log("Bước 1: nhồi thêm dữ liệu");
    console.log("Bước 2: thêm vào độ dài");
    console.log("Bước 3: khởi tạo bộ đệm MD (MD buffer)");
    console.log("Bước 4: xử lý các khối dữ liệu 512-bit");
    console.log("Bước 5: xuất kết quả");
};

(() => {
    sha1("A Test");
})();
