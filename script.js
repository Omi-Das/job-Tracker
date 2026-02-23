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
        // শুরুতে এবং All Jobs ট্যাবে শুধু সংখ্যাটি দেখাবে
        tabJobCount.innerText = `${currentViewCount} Jobs`;
    } else {
        if (currentStatus === 'interview-filter-btn') {
            currentViewCount = interviewList.length;
        } else {
            currentViewCount = rejectedList.length;
        }

        if (currentViewCount === 0) {
            tabJobCount.innerText = `0 Jobs`;
        } else {
            tabJobCount.innerText = `${currentViewCount} of ${totalJobs} Jobs`;
        }
    }

    if (currentViewCount === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
    }
}


function toggleStyle(id) {
    currentStatus = id;

    allFilterBtn.classList.remove('bg-blue-500', 'text-white');
    allFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white');
    interviewFilterBtn.classList.add('bg-white', 'text-[#64748B]');

    rejectedFilterBtn.classList.remove('bg-blue-500', 'text-white'); 
    rejectedFilterBtn.classList.add('bg-white', 'text-[#64748B]');

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

        if (id === 'interview-filter-btn') {
            renderInterview();
        } else {
            renderRejected();
        }
    }
    calculateCount();
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interview-btn') || event.target.classList.contains('rejected-btn')) {
        const parent = event.target.closest('.card');
        
        const jobData = {
            company: parent.querySelector('.company-name').innerText,
            title: parent.querySelector('.job-title').innerText,
            location: parent.querySelector('.location').innerText,
            type: parent.querySelector('.type').innerText,
            salary: parent.querySelector('.salary').innerText
        };

        const statusLabel = parent.querySelector('.status-text');

        if (event.target.classList.contains('interview-btn')) {
            if (!interviewList.find(i => i.company === jobData.company)) interviewList.push(jobData);
            rejectedList = rejectedList.filter(i => i.company !== jobData.company);
            
            if(statusLabel) {
                statusLabel.innerText = 'Interview';
                statusLabel.className = 'status-text bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-[10px] font-bold uppercase inline-block';
            }
        } else {
            if (!rejectedList.find(i => i.company === jobData.company)) rejectedList.push(jobData);
            interviewList = interviewList.filter(i => i.company !== jobData.company);
            
            if(statusLabel) {
                statusLabel.innerText = 'Rejected';
                statusLabel.className = 'status-text bg-rose-50 text-rose-600 px-2 py-1 rounded text-[10px] font-bold uppercase inline-block';
            }
        }

        if (currentStatus === 'interview-filter-btn') renderInterview();
        if (currentStatus === 'rejected-filter-btn') renderRejected();
        calculateCount();
    }
    
    if (event.target.closest('.delete-btn')) {
        const parent = event.target.closest('.card');
        const companyName = parent.querySelector('.company-name').innerText;
        
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
    div.className = 'card bg-white p-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:justify-between rounded-lg shadow-sm border border-gray-100 mb-4';
    div.innerHTML = `
        <div class="space-y-1">
            <p class="text-[18px] company-name font-semibold text-[#002C5C]">${job.company}</p>
            <p class="text-[14px] job-title pb-3 text-[#64748B]">${job.title}</p>
            <p class="text-[14px] text-[#64748B]">
                <span class="location">${job.location}</span> • 
                <span class="type">${job.type}</span> • 
                <span class="salary">${job.salary}</span>
            </p>
            <p class="status-text text-[14px] bg-${color}-50 text-${color}-600 font-medium px-2 rounded-md py-1 w-[110px] text-center uppercase">
                ${status}
            </p>
            <div class="mt-3 flex gap-2">
                <button class="interview-btn bg-white border font-semibold border-green-500 text-green-500 px-4 py-1 rounded-md text-[14px] uppercase">Interview</button>
                <button class="rejected-btn bg-white border font-semibold border-red-500 text-red-500 px-4 py-1 rounded-md text-[14px] uppercase">Rejected</button>
            </div>
        </div>
        <div class="flex sm:justify-end">
            <button class="delete-btn opacity-30 hover:opacity-100 p-2">
                <img src="./images/Vector.png" class="w-4 h-4" alt="Delete">
            </button>
        </div>`;
    return div;
}

calculateCount();
