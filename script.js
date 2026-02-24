let interviewList = [];
let rejectedList = [];
let currentStatus = 'all-filter-btn';

const total = document.getElementById('total');
const interviewCount = document.getElementById('interviewCount');
const rejectedCount = document.getElementById('rejectedCount');
const tabJobCount = document.getElementById('tab-job-count');

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById('allCards');
const filterSection = document.getElementById('filtered-section');
const mainContainer = document.querySelector('main');
const emptyMsg = document.getElementById('empty-message');

function calculateCount() {
    const totalJobs = allCardSection.children.length;
    
    total.innerText = totalJobs;
    interviewCount.innerText = interviewList.length;
    rejectedCount.innerText = rejectedList.length;

    let currentViewCount = 0;
    if (currentStatus === 'all-filter-btn') {
        currentViewCount = totalJobs;
        tabJobCount.innerText = `${currentViewCount} Jobs`;
    } else {
        currentViewCount = (currentStatus === 'interview-filter-btn') ? interviewList.length : rejectedList.length;
        
        if (currentViewCount === 0) {
            tabJobCount.innerText = `0 Jobs`;
        } else {
            tabJobCount.innerText = `${currentViewCount} of ${totalJobs} Jobs`;
        }
    }

    if (currentViewCount === 0) {
        emptyMsg.classList.remove('hidden');
        emptyMsg.classList.add('flex', 'flex-col', 'items-center','space-y-4'); 
    } else {
        emptyMsg.classList.add('hidden');
        emptyMsg.classList.remove('flex', 'flex-col', 'items-center');
    }
}

function toggleStyle(id) {
    currentStatus = id;

    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-blue-500', 'text-white');
        btn.classList.add('bg-white', 'text-[#64748B]');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-[#64748B]');
    selected.classList.add('bg-blue-500', 'text-white');

    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        allCardSection.classList.add('flex'); 
        filterSection.classList.add('hidden');
        filterSection.classList.remove('flex');
    } else {
        allCardSection.classList.add('hidden');
        allCardSection.classList.remove('flex');
        filterSection.classList.remove('hidden');
        filterSection.classList.add('flex');

        if (id === 'interview-filter-btn') renderInterview();
        else renderRejected();
    }
    calculateCount();
}


function updateStatusInAllTab(companyName, status, color) {
    const allCards = allCardSection.querySelectorAll('.card');
    allCards.forEach(card => {
        const nameInAll = card.querySelector('.company-name').innerText;
        if (nameInAll === companyName) {
            let statusLabel = card.querySelector('.status-text');
           
            if (!statusLabel) {
                statusLabel = document.createElement('span');
                card.querySelector('.job-title').after(statusLabel);
            }
            statusLabel.innerText = status;
            statusLabel.className = `status-text bg-${color}-50 text-${color}-600 px-2 py-1 rounded text-[10px] font-bold uppercase inline-block mb-2`;
        }
    });
}

mainContainer.addEventListener('click', function (event) {
    const target = event.target;
    
    if (target.classList.contains('interview-btn') || target.classList.contains('rejected-btn')) {
        const parent = target.closest('.card');
        const companyName = parent.querySelector('.company-name').innerText;
        
        const jobData = {
            company: companyName,
            title: parent.querySelector('.job-title').innerText,
            location: parent.querySelector('.location').innerText,
            type: parent.querySelector('.type').innerText,
            salary: parent.querySelector('.salary').innerText,
            description: parent.querySelector('.description').innerText
        };

        if (target.classList.contains('interview-btn')) {
            
            if (!interviewList.find(i => i.company === jobData.company)) interviewList.push(jobData);
            rejectedList = rejectedList.filter(i => i.company !== jobData.company);
            
           
            updateStatusInAllTab(companyName, 'Interview', 'emerald');
        } else {
            // লিস্ট আপডেট
            if (!rejectedList.find(i => i.company === jobData.company)) rejectedList.push(jobData);
            interviewList = interviewList.filter(i => i.company !== jobData.company);
         
            updateStatusInAllTab(companyName, 'Rejected', 'rose');
        }

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();
        calculateCount();
    }
    
    if (target.closest('.delete-btn')) {
        const parent = target.closest('.card');
        const companyName = parent.querySelector('.company-name').innerText;
        
       
        const allCards = allCardSection.querySelectorAll('.card');
        allCards.forEach(card => {
            if(card.querySelector('.company-name').innerText === companyName) card.remove();
        });


        parent.remove();

        interviewList = interviewList.filter(i => i.company !== companyName);
        rejectedList = rejectedList.filter(i => i.company !== companyName);
        
        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();
        calculateCount();
    }
});

function renderInterview() {
    filterSection.innerHTML = '';
    interviewList.forEach(job => filterSection.appendChild(createCard(job, 'Interview', 'emerald')));
}

function renderRejected() {
    filterSection.innerHTML = '';
    rejectedList.forEach(job => filterSection.appendChild(createCard(job, 'Rejected', 'rose')));
}

function createCard(job, status, color) {
    let div = document.createElement('div');
    div.className = 'card bg-white border p-8 rounded-xl flex justify-between items-start mb-4 w-full';
    div.innerHTML = `
        <div class="space-y-4 flex-1">
            <div>
                <h2 class="company-name text-xl font-bold text-[#1e3a8a]">${job.company}</h2>
                <p class="job-title text-gray-500 text-sm mb-2">${job.title}</p>
                <span class="status-text bg-${color}-50 text-${color}-600 px-2 py-1 rounded text-[10px] font-bold uppercase inline-block">${status}</span>
            </div>
            <div class="flex gap-2 text-sm text-[#94a3b8]">
                <span class="location">${job.location}</span> • <span class="type">${job.type}</span> • <span class="salary">${job.salary}</span>
            </div>
            <p class="description text-[#475569] text-sm">${job.description}</p>
            <div class="flex gap-3">
                <button class="interview-btn bg-white border font-semibold border-green-500 text-green-500 px-4 py-1 rounded-md text-[14px] uppercase hover:bg-green-500 hover:text-white transition-all">INTERVIEW</button>
                <button class="rejected-btn bg-white border font-semibold border-red-500 text-red-500 px-4 py-1 rounded-md text-[14px] uppercase hover:bg-red-500 hover:text-white transition-all">REJECTED</button>
            </div>
        </div>
        <button class="delete-btn opacity-50 border-2 p-2 rounded-full hover:opacity-100">
            <img src="./images/Vector.png" class="w-4 h-4" alt="Delete">
        </button>`;
    return div;
}

calculateCount();
