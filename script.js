const FACEBOOK_PAGE_URL = "https://www.facebook.com/ZRF";
const WHATSAPP_NUMBER = "8801911254448";

const products = [
  {name:"Ladies Tank Top", category:"ladies", desc:"আরামদায়ক ও স্টাইলিশ", price:"মূল্য জানতে অর্ডার করুন", tag:"Ladies", initial:"LT"},
  {name:"Kids T-Shirt", category:"kids tshirt", desc:"বাচ্চাদের জন্য আরামদায়ক", price:"মূল্য জানতে অর্ডার করুন", tag:"Kids", initial:"KT"},
  {name:"Kids Short Pant", category:"kids bottom", desc:"দৈনন্দিন ব্যবহারের জন্য", price:"মূল্য জানতে অর্ডার করুন", tag:"Kids", initial:"KP"},
  {name:"Kids Polo Shirt", category:"kids tshirt", desc:"স্মার্ট Polo ডিজাইন", price:"মূল্য জানতে অর্ডার করুন", tag:"Kids", initial:"PS"},
  {name:"Ladies Leggings", category:"ladies bottom", desc:"স্ট্রেচি ও আরামদায়ক", price:"মূল্য জানতে অর্ডার করুন", tag:"Ladies", initial:"LL"},
  {name:"Ladies T-Shirt", category:"ladies tshirt", desc:"ক্যাজুয়াল ও ট্রেন্ডি", price:"মূল্য জানতে অর্ডার করুন", tag:"Ladies", initial:"LS"},
  {name:"Kids Casual Wear", category:"kids", desc:"ছোটদের দৈনন্দিন ফ্যাশন", price:"মূল্য জানতে অর্ডার করুন", tag:"Kids", initial:"KC"},
  {name:"Ladies Casual Wear", category:"ladies", desc:"স্টাইলিশ ক্যাজুয়াল কালেকশন", price:"মূল্য জানতে অর্ডার করুন", tag:"Ladies", initial:"LC"}
];

const grid = document.getElementById("productGrid");
const modal = document.getElementById("orderModal");
const modalProduct = document.getElementById("modalProduct");
const modalPrice = document.getElementById("modalPrice");
const selectedProduct = document.getElementById("selectedProduct");

document.getElementById("facebookBtn").href = FACEBOOK_PAGE_URL;
document.getElementById("year").textContent = new Date().getFullYear();

function renderProducts(filter="all"){
  const list = products.filter(p => filter === "all" || p.category.includes(filter));
  grid.innerHTML = list.map((p, i) => `
    <article class="product-card">
      <div class="product-image">
        <span class="tag">${p.tag}</span>
        <span class="initial">${p.initial}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="price">${p.price}</div>
        <button class="order-btn" data-product="${p.name}" data-price="${p.price}">অর্ডার নিন</button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".order-btn").forEach(btn => {
    btn.addEventListener("click", () => openOrder(btn.dataset.product, btn.dataset.price));
  });
}

function openOrder(name, price){
  modalProduct.textContent = name;
  modalPrice.textContent = price;
  selectedProduct.value = name;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.getElementById("customerName").focus();
}

function closeOrder(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
}

document.getElementById("closeModal").addEventListener("click", closeOrder);
document.querySelector(".modal-backdrop").addEventListener("click", closeOrder);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeOrder(); });

document.querySelectorAll(".category").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

document.getElementById("orderForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const note = document.getElementById("customerNote").value.trim();
  const product = selectedProduct.value;

  const message =
`আসসালামু আলাইকুম, Z RAKIB FASHION-এ অর্ডার করতে চাই।

পণ্য: ${product}
নাম: ${name}
মোবাইল: ${phone}
ঠিকানা: ${address}
সাইজ/রং/পরিমাণ: ${note || "জানানো হয়নি"}

দয়া করে অর্ডারটি কনফার্ম করুন।`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
});

renderProducts();
