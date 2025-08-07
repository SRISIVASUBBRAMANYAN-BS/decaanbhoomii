// Global variables
let currentSlide = 0;
let currentLanguage = 'en';
let slideInterval;

// Tamil Nadu districts data
const tamilNaduDistricts = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli",
    "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet",
    "Sivaganga", "Karur", "Ramanathapuram", "Virudhunagar", "Cuddalore",
    "Nagapattinam", "Kanchipuram", "Tiruvannamalai", "Villupuram", "Tiruvallur",
    "Dharmapuri", "Krishnagiri", "Ariyalur", "Perambalur", "Pudukkottai",
    "Theni", "Nilgiris", "Namakkal", "Tiruppur", "Kanyakumari", "Kallakurichi",
    "Chengalpattu", "Tenkasi", "Tirupathur", "Mayiladuthurai"
];

// Sample clients data
const clientsData = [
    {
        id: 1,
        name: { en: "Green Valley Estates", ta: "கிரீன் வேலி எஸ்டேட்ஸ்" },
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
        area: { en: "2.5 Acres", ta: "2.5 ஏக்கர்" },
        district: "Chennai",
        state: "Tamil Nadu",
        plotsSold: 12,
        dtcpApproved: true,
        link: ""
    },
    {
        id: 2,
        name: { en: "Sunrise Properties", ta: "சன்ரைஸ் ப்ராபர்ட்டீஸ்" },
        image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
        area: { en: "1.8 Acres", ta: "1.8 ஏக்கர்" },
        district: "Coimbatore",
        state: "Tamil Nadu",
        plotsSold: 8,
        dtcpApproved: true,
        link: ""
    },
    {
        id: 3,
        name: { en: "Golden Hills", ta: "கோல்டன் ஹில்ஸ்" },
        image: "https://images.unsplash.com/photo-1448630360428-65456885c650?w=400&h=300&fit=crop",
        area: { en: "3.2 Acres", ta: "3.2 ஏக்கர்" },
        district: "Madurai",
        state: "Tamil Nadu",
        plotsSold: 15,
        dtcpApproved: true,
        link: ""
    },
    {
        id: 4,
        name: { en: "Blue Ocean Plots", ta: "ப்ளூ ஓஷன் ப்ளாட்ஸ்" },
        image: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&h=300&fit=crop",
        area: { en: "4.1 Acres", ta: "4.1 ஏக்கர்" },
        district: "Kanyakumari",
        state: "Tamil Nadu",
        plotsSold: 20,
        dtcpApproved: true,
        link: ""
    },
    {
        id: 5,
        name: { en: "Mountain View Estates", ta: "மவுண்டன் வியூ எஸ்டேட்ஸ்" },
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        area: { en: "5.0 Acres", ta: "5.0 ஏக்கர்" },
        district: "Nilgiris",
        state: "Tamil Nadu",
        plotsSold: 25,
        dtcpApproved: true,
        link: ""
    },
    {
        id: 6,
        name: { en: "River Side Plots", ta: "ரிவர் சைட் ப்ளாட்ஸ்" },
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        area: { en: "2.8 Acres", ta: "2.8 ஏக்கர்" },
        district: "Thanjavur",
        state: "Tamil Nadu",
        plotsSold: 18,
        dtcpApproved: true,
        link: ""
    }
];

// Disable right-click and dev tools
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('keydown', function(e) {
    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        return false;
    }
});

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    // Show language modal first
    showLanguageModal();
    
    // Initialize WhatsApp button
    initWhatsAppButton();
    
    // Initialize carousel
    initCarousel();
    
    // Populate districts
    populateDistricts();
    
    // Display clients
    displayClients();
});

// Language functions
function showLanguageModal() {
    document.getElementById('languageModal').style.display = 'flex';
}

function setLanguage(lang) {
    currentLanguage = lang;
    document.getElementById('languageModal').style.display = 'none';
    
    // Show loading screen
    document.getElementById('loadingScreen').style.display = 'flex';
    
    // Hide loading screen after animation
    setTimeout(() => {
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
        updateLanguage();
    }, 4000);
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en]');
    elements.forEach(element => {
        const text = element.getAttribute(`data-${currentLanguage}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update select options
    updateSelectOptions();
    
    // Re-display clients with new language
    displayClients();
}

function updateSelectOptions() {
    const stateSelect = document.getElementById('stateSelect');
    const districtSelect = document.getElementById('districtSelect');
    
    // Update state select
    stateSelect.innerHTML = `<option value="">${currentLanguage === 'en' ? 'Select State' : 'மாநிலத்தைத் தேர்ந்தெடுக்கவும்'}</option>
                            <option value="Tamil Nadu">${currentLanguage === 'en' ? 'Tamil Nadu' : 'தமிழ்நாடு'}</option>`;
    
    // Update district select
    districtSelect.innerHTML = `<option value="">${currentLanguage === 'en' ? 'Select District' : 'மாவட்டத்தைத் தேர்ந்தெடுக்கவும்'}</option>`;
    tamilNaduDistricts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

// WhatsApp button functionality
function initWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/916380463345', '_blank');
    });
}

// Carousel functionality
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    // Auto-play carousel
    slideInterval = setInterval(() => {
        nextSlide();
    }, 4000);
    
    // Pause on hover
    const carousel = document.querySelector('.carousel-container');
    carousel.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            nextSlide();
        }, 4000);
    });
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (n >= slides.length) currentSlide = 0;
    if (n < 0) currentSlide = slides.length - 1;
    
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    currentSlide++;
    showSlide(currentSlide);
}

function currentSlideFunc(n) {
    currentSlide = n - 1;
    showSlide(currentSlide);
}

// Location filter functionality
function populateDistricts() {
    const districtSelect = document.getElementById('districtSelect');
    tamilNaduDistricts.forEach(district => {
        const option = document.createElement('option');
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });
}

function handleStateChange() {
    const stateSelect = document.getElementById('stateSelect');
    const districtSelect = document.getElementById('districtSelect');
    
    if (stateSelect.value === 'Tamil Nadu') {
        districtSelect.classList.remove('hidden');
        districtSelect.style.animation = 'slideInUp 0.5s ease-out';
    } else {
        districtSelect.classList.add('hidden');
        districtSelect.value = '';
    }
    
    displayClients();
}

function handleDistrictChange() {
    displayClients();
}

// Client display functionality
function displayClients() {
    const clientsGrid = document.getElementById('clientsGrid');
    const stateSelect = document.getElementById('stateSelect');
    const districtSelect = document.getElementById('districtSelect');
    
    let filteredClients = clientsData;
    
    // Filter by state and district
    if (stateSelect.value && districtSelect.value) {
        filteredClients = clientsData.filter(client => 
            client.state === stateSelect.value && client.district === districtSelect.value
        );
    }
    
    clientsGrid.innerHTML = '';
    
    filteredClients.forEach((client, index) => {
        const clientCard = createClientCard(client, index);
        clientsGrid.appendChild(clientCard);
    });
}

function createClientCard(client, index) {
    const card = document.createElement('div');
    card.className = 'client-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const clientName = client.name[currentLanguage] || client.name.en;
    const clientArea = client.area[currentLanguage] || client.area.en;
    
    card.innerHTML = `
        <div class="client-image">
            <img src="${client.image}" alt="${clientName}">
            <div class="badge badge-sold">${client.plotsSold} ${currentLanguage === 'en' ? 'plots sold' : 'ப்ளாட்கள் விற்பனை'}</div>
            ${client.dtcpApproved ? `<div class="badge badge-approved">${currentLanguage === 'en' ? 'DTCP Approved ✓' : 'DTCP அங்கீகரிக்கப்பட்டது ✓'}</div>` : ''}
        </div>
        <div class="client-info">
            <h3>${clientName}</h3>
            <div class="client-details">
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${client.district}, ${client.state}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${clientArea}</span>
                </div>
            </div>
            <button class="view-btn" onclick="viewPropertyDetails('${client.link}')">
                <i class="fas fa-eye"></i>
                ${currentLanguage === 'en' ? 'View Property Details' : 'சொத்து விவரங்களைப் பார்க்கவும்'}
            </button>
        </div>
    `;
    
    return card;
}

// Property details functionality
function viewPropertyDetails(link) {
    // Show property loading screen
    document.getElementById('propertyLoading').classList.remove('hidden');
    
    // Simulate loading time
    setTimeout(() => {
        document.getElementById('propertyLoading').classList.add('hidden');
        
        if (link && link.trim() !== '') {
            // If link is provided, redirect to the link
            window.open(link, '_blank');
        } else {
            // If no link, show alert
            alert(currentLanguage === 'en' ? 
                'Property details will be available soon!' : 
                'சொத்து விவரங்கள் விரைவில் கிடைக்கும்!');
        }
    }, 2000);
}

// Email functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.contact-item') && e.target.closest('.contact-item').querySelector('i.fa-envelope')) {
        window.location.href = 'mailto:deccaanowcorp@gmail.com';
    }
});

// Smooth scrolling for better UX
document.addEventListener('scroll', function() {
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (window.scrollY > 100) {
        whatsappBtn.style.opacity = '1';
    } else {
        whatsappBtn.style.opacity = '0.8';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.client-card, .service-item');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});

// Performance optimization - lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
});
