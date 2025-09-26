// Initialize animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeTypedText();
    initializeScrollAnimations();
    initializeResourceSearch();
});

// Typed text animation
function initializeTypedText() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Tạo bài học chỉ trong vài phút',
            'Quản lý lớp học hiệu quả',
            'Đánh giá học sinh tự động',
            'Tương tác 24/7 với AI',
            'Tối ưu hóa công việc giảng dạy'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// Initialize scroll animations
function initializeScrollAnimations() {
    anime({
        targets: '.hover-lift',
        translateY: [50, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeOutExpo'
    });
}

// Initialize main animations
function initializeAnimations() {
    // Animate feature cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: entry.target,
                    translateY: [30, 0],
                    opacity: [0, 1],
                    duration: 600,
                    easing: 'easeOutQuad'
                });
            }
        });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card, .hover-lift').forEach(card => {
        observer.observe(card);
    });
}

// Notification system
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
        <div class="flex items-center space-x-3">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Resource search functionality
function initializeResourceSearch() {
    const resources = [
        {
            id: 1,
            title: 'Hướng Dẫn An Toàn Điện',
            category: 'electrical',
            description: 'Tài liệu an toàn lao động cho ngành điện',
            type: 'PDF',
            icon: 'fas fa-bolt'
        },
        {
            id: 2,
            title: 'Cơ Bản Về Máy Tiện',
            category: 'mechanical',
            description: 'Hướng dẫn vận hành máy tiện cơ bản',
            type: 'Video',
            icon: 'fas fa-cog'
        },
        {
            id: 3,
            title: 'Lập Trình Web Cơ Bản',
            category: 'it',
            description: 'Học HTML, CSS và JavaScript từ đầu',
            type: 'Interactive',
            icon: 'fas fa-code'
        },
        {
            id: 4,
            title: 'Kỹ Thuật Nấu Phở',
            category: 'cooking',
            description: 'Bí quyết nấu phở truyền thống',
            type: 'Recipe',
            icon: 'fas fa-utensils'
        },
        {
            id: 5,
            title: 'Sửa Chữa Động Cơ',
            category: 'mechanical',
            description: 'Hướng dẫn bảo trì và sửa chữa',
            type: 'PDF',
            icon: 'fas fa-wrench'
        },
        {
            id: 6,
            title: 'Mạch Điện Tử Cơ Bản',
            category: 'electrical',
            description: 'Thiết kế và phân tích mạch điện',
            type: 'Simulation',
            icon: 'fas fa-microchip'
        }
    ];

    window.allResources = resources;
    displayResources(resources);
}

function displayResources(resources) {
    const container = document.getElementById('resource-results');
    container.innerHTML = '';

    resources.forEach(resource => {
        const resourceCard = document.createElement('div');
        resourceCard.className = 'bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer';
        resourceCard.innerHTML = `
            <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <i class="${resource.icon} text-white"></i>
                </div>
                <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 mb-2">${resource.title}</h4>
                    <p class="text-gray-600 text-sm mb-3">${resource.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">${resource.type}</span>
                        <button onclick="downloadResource(${resource.id})" class="text-blue-500 hover:text-blue-600 text-sm">
                            <i class="fas fa-download mr-1"></i>Tải xuống
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(resourceCard);
    });
}

function searchResources() {
    const searchTerm = document.getElementById('resource-search').value.toLowerCase();
    const filteredResources = window.allResources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm) ||
        resource.description.toLowerCase().includes(searchTerm)
    );
    displayResources(filteredResources);
}

function filterResources(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-blue-500', 'text-white');
        btn.classList.add('bg-gray-200', 'text-gray-700');
    });
    event.target.classList.add('active', 'bg-blue-500', 'text-white');
    event.target.classList.remove('bg-gray-200', 'text-gray-700');

    // Filter resources
    let filteredResources;
    if (category === 'all') {
        filteredResources = window.allResources;
    } else {
        filteredResources = window.allResources.filter(resource => 
            resource.category === category
        );
    }
    displayResources(filteredResources);
}

function downloadResource(resourceId) {
    const resource = window.allResources.find(r => r.id === resourceId);
    showNotification(`Đang tải xuống: ${resource.title}`);
    
    // Simulate download
    setTimeout(() => {
        showNotification(`Đã tải xong: ${resource.title}`);
    }, 2000);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.classList.add('bg-white/90');
        nav.classList.remove('glass-effect');
    } else {
        nav.classList.remove('bg-white/90');
        nav.classList.add('glass-effect');
    }
});

// Form submission handling
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    showNotification('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm.');
    this.reset();
});

// Interactive dashboard demo
function initializeDashboardDemo() {
    // Simulate real-time updates
    setInterval(() => {
        const studentCount = document.querySelector('.text-3xl.font-bold');
        if (studentCount && studentCount.textContent === '156') {
            const newCount = Math.floor(Math.random() * 10) + 150;
            studentCount.textContent = newCount;
        }
    }, 5000);

    // Animate student status changes
    setInterval(() => {
        const studentList = document.getElementById('student-list');
        if (studentList) {
            const statuses = ['Online', 'Bận', 'Offline'];
            const statusClasses = ['bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-red-100 text-red-800'];
            
            const statusElements = studentList.querySelectorAll('.px-2.py-1');
            statusElements.forEach(element => {
                if (Math.random() > 0.7) { // 30% chance to change status
                    const randomIndex = Math.floor(Math.random() * statuses.length);
                    element.textContent = statuses[randomIndex];
                    element.className = `px-2 py-1 rounded text-xs ${statusClasses[randomIndex]}`;
                }
            });
        }
    }, 3000);
}

// Initialize dashboard demo when page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(initializeDashboardDemo, 2000);
});

// Add hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button, .hover-lift');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.gradient-bg');
    
    if (heroSection) {
        const speed = scrolled * 0.5;
        heroSection.style.transform = `translateY(${speed}px)`;
    }
});

// Loading animation for resource cards
function animateResourceCards() {
    anime({
        targets: '#resource-results .bg-white',
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuad'
    });
}

// Call animation after displaying resources
const originalDisplayResources = displayResources;
displayResources = function(resources) {
    originalDisplayResources(resources);
    setTimeout(animateResourceCards, 100);
};