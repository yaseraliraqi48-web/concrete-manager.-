// ==========================================
// نظام إدارة شركات الكونكريت والصب
// الإصدار الأول
// ==========================================

let orders = JSON.parse(
  localStorage.getItem("concrete_orders") || "[]"
);

let finance = JSON.parse(
  localStorage.getItem("concrete_finance") || "[]"
);


// حفظ البيانات
function saveData() {
  localStorage.setItem(
    "concrete_orders",
    JSON.stringify(orders)
  );

  localStorage.setItem(
    "concrete_finance",
    JSON.stringify(finance)
  );
}


// تنسيق المبالغ بالدينار العراقي
function money(value) {
  return new Intl.NumberFormat("ar-IQ").format(
    Number(value) || 0
  );
}


// إضافة طلب صب
function addOrder() {

  const customer =
    document.getElementById("customer").value;

  const phone =
    document.getElementById("phone").value;

  const location =
    document.getElementById("location").value;

  const volume =
    Number(document.getElementById("volume").value);

  const price =
    Number(document.getElementById("price").value);

  const paid =
    Number(document.getElementById("paid").value) || 0;

  const notes =
    document.getElementById("notes").value;


  if (!customer || !location || !volume || !price) {

    alert("يرجى إدخال اسم الزبون والموقع والكمية والسعر.");

    return;
  }


  const total = volume * price;

  const remaining = total - paid;


  const order = {

    id: Date.now(),

    customer: customer,

    phone: phone,

    location: location,

    volume: volume,

    price: price,

    total: total,

    paid: paid,

    remaining: remaining,

    notes: notes,

    date: new Date().toLocaleString("ar-IQ")

  };


  orders.unshift(order);

  saveData();

  alert("✅ تم حفظ طلب الصب بنجاح");

  document.querySelector("form").reset();

  showOrders();
  updateDashboard();
}


// عرض الطلبات
function showOrders() {

  console.log("عدد الطلبات:", orders.length);

}


// تحديث الإحصائيات
function updateDashboard() {

  const totalVolume =
    orders.reduce(
      (sum, order) => sum + Number(order.volume),
      0
    );


  const totalPaid =
    orders.reduce(
      (sum, order) => sum + Number(order.paid),
      0
    );


  const
