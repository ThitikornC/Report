// Sample data: Primary School Students (ป.1-6) with 3 subject scores
const studentData = {
  ป1: [
    {
      name: 'สมชาย ใจดี',
      grade: 'ป.1',
      subjects: [
        {name: 'คณิตศาสตร์', score: 85},
        {name: 'ภาษาไทย', score: 88},
        {name: 'วิทยาศาสตร์', score: 82}
      ]
    },
    {
      name: 'สมหญิง แสนงาม',
      grade: 'ป.1',
      subjects: [
        {name: 'คณิตศาสตร์', score: 92},
        {name: 'ภาษาไทย', score: 95},
        {name: 'วิทยาศาสตร์', score: 90}
      ]
    }
  ],
  ป2: [
    {
      name: 'จิรภัทร สุขใจ',
      grade: 'ป.2',
      subjects: [
        {name: 'คณิตศาสตร์', score: 78},
        {name: 'ภาษาไทย', score: 80},
        {name: 'วิทยาศาสตร์', score: 76}
      ]
    },
    {
      name: 'กิตติ วงศ์สา',
      grade: 'ป.2',
      subjects: [
        {name: 'คณิตศาสตร์', score: 88},
        {name: 'ภาษาไทย', score: 85},
        {name: 'วิทยาศาสตร์', score: 86}
      ]
    }
  ],
  ป3: [
    {
      name: 'ปรีชา เชื่อมั่น',
      grade: 'ป.3',
      subjects: [
        {name: 'คณิตศาสตร์', score: 75},
        {name: 'ภาษาไทย', score: 78},
        {name: 'วิทยาศาสตร์', score: 82}
      ]
    },
    {
      name: 'วิไล ดีงาม',
      grade: 'ป.3',
      subjects: [
        {name: 'คณิตศาสตร์', score: 91},
        {name: 'ภาษาไทย', score: 93},
        {name: 'วิทยาศาสตร์', score: 89}
      ]
    }
  ],
  ป4: [
    {
      name: 'สมบูรณ์ ศรีชัย',
      grade: 'ป.4',
      subjects: [
        {name: 'คณิตศาสตร์', score: 94},
        {name: 'ภาษาไทย', score: 92},
        {name: 'วิทยาศาสตร์', score: 88}
      ]
    }
  ],
  ป5: [
    {
      name: 'นิตยา พรหมภักษ์',
      grade: 'ป.5',
      subjects: [
        {name: 'คณิตศาสตร์', score: 89},
        {name: 'ภาษาไทย', score: 87},
        {name: 'วิทยาศาสตร์', score: 85}
      ]
    }
  ],
  ป6: [
    {
      name: 'สมพร นวลจันทร์',
      grade: 'ป.6',
      subjects: [
        {name: 'คณิตศาสตร์', score: 96},
        {name: 'ภาษาไทย', score: 95},
        {name: 'วิทยาศาสตร์', score: 94}
      ]
    }
  ]
};

function $(sel) {
  return document.querySelector(sel);
}

function getScoreColor(score) {
  if (score >= 90) return '#22c55e'; // Green A
  if (score >= 80) return '#3b82f6'; // Blue B
  if (score >= 70) return '#f59e0b'; // Orange C
  if (score >= 60) return '#ef8a3e'; // Orange-Red D
  return '#ef4444'; // Red F
}

function updateStudentList() {
  const gradeKey = $('#gradeSelect').value;
  const studentSelect = $('#studentSelect');
  
  if (!gradeKey) {
    studentSelect.innerHTML = '<option value="">-- เลือกนักเรียน --</option>';
    studentSelect.disabled = true;
    return;
  }

  studentSelect.disabled = false;
  studentSelect.innerHTML = '<option value="">-- เลือกนักเรียน --</option>';

  const students = studentData[gradeKey] || [];
  students.forEach((student, index) => {
    const option = document.createElement('option');
    option.value = JSON.stringify({gradeKey: gradeKey, index: index});
    option.textContent = student.name;
    studentSelect.appendChild(option);
  });
}

function displayReport() {
  const studentSelectValue = $('#studentSelect').value;
  const selectedSubject = $('#subjectSelect').value;
  const reportContent = $('#reportContent');

  if (!studentSelectValue) {
    reportContent.innerHTML = '<div class="placeholder"><p>⬆️ กรุณาเลือกนักเรียนเพื่อดูคะแนน</p></div>';
    return;
  }

  const studentInfo = JSON.parse(studentSelectValue);
  const student = studentData[studentInfo.gradeKey][studentInfo.index];
  
  // Filter subjects based on selection
  let displaySubjects = student.subjects;
  if (selectedSubject) {
    displaySubjects = student.subjects.filter(s => s.name === selectedSubject);
  }
  
  const avgScore = (displaySubjects.reduce((sum, s) => sum + s.score, 0) / displaySubjects.length).toFixed(1);
  const maxScore = Math.max(...displaySubjects.map(s => s.score));
  const minScore = Math.min(...displaySubjects.map(s => s.score));

  let html = `
    <div class="student-header">
      <h2>${student.name}</h2>
      <p>ชั้น: ${student.grade}</p>
    </div>

    <div class="stats-cards">
      <div class="stat-card">
        <div class="stat-label">คะแนนเฉลี่ย</div>
        <div class="stat-value">${avgScore}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">คะแนนสูงสุด</div>
        <div class="stat-value">${maxScore}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">คะแนนต่ำสุด</div>
        <div class="stat-value">${minScore}</div>
      </div>
    </div>

    <div class="scores-section">
      <h3>📈 คะแนนรายวิชา${selectedSubject ? ` (${selectedSubject})` : ''}</h3>
      <div class="subject-cards">
  `;

  displaySubjects.forEach(subject => {
    const color = getScoreColor(subject.score);
    html += `
      <div class="subject-card">
        <div class="subject-name">${subject.name}</div>
        <div class="subject-score-container">
          <div class="score-circle" style="background: ${color};">
            ${subject.score}
          </div>
        </div>
        <div class="score-label">
          ${subject.score >= 90 ? 'A' : subject.score >= 80 ? 'B' : subject.score >= 70 ? 'C' : subject.score >= 60 ? 'D' : 'F'}
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>

    <div class="details-section">
      <h3>📋 รายละเอียดคะแนน${selectedSubject ? ` (${selectedSubject})` : ''}</h3>
      <table class="scores-table">
        <thead>
          <tr>
            <th>วิชา</th>
            <th>คะแนน</th>
            <th>เกรด</th>
          </tr>
        </thead>
        <tbody>
  `;

  displaySubjects.forEach(subject => {
    const grade = subject.score >= 90 ? 'A' : subject.score >= 80 ? 'B' : subject.score >= 70 ? 'C' : subject.score >= 60 ? 'D' : 'F';
    const color = getScoreColor(subject.score);
    html += `
      <tr>
        <td>${subject.name}</td>
        <td><strong>${subject.score}</strong></td>
        <td><span style="color: ${color}; font-weight: bold; font-size: 18px;">${grade}</span></td>
      </tr>
    `;
  });

  html += `
        </tbody>
      </table>
    </div>
  `;

  reportContent.innerHTML = html;
}

// Autocomplete search used in report page
function performReportSearch(query) {
  const listContainer = document.getElementById('searchResultsListReport');
  const box = document.getElementById('searchResultsReport');
  if (!listContainer || !box) return;
  if (!query || !query.trim()) { box.style.display = 'none'; return; }

  const q = query.toLowerCase();
  const results = [];
  Object.keys(studentData).forEach(gradeKey => {
    (studentData[gradeKey] || []).forEach((student, idx) => {
      if (student.name.toLowerCase().includes(q)) {
        results.push({ name: student.name, gradeKey, index: idx, grade: student.grade });
      }
    });
  });

  listContainer.innerHTML = '';
  if (results.length === 0) {
    const no = document.createElement('div');
    no.className = 'no-search-results'; no.textContent = 'ไม่พบผลการค้นหา';
    listContainer.appendChild(no); box.style.display = 'block'; return;
  }

  results.forEach(r => {
    const item = document.createElement('div');
    item.className = 'search-result-item-report';
    item.innerHTML = `<div class="search-result-name">${r.name}</div><div class="search-result-badge">ชั้น ${r.grade.split('.')[1]}</div>`;
    item.onclick = () => {
      // set grade select
      document.getElementById('gradeSelect').value = r.gradeKey;
      // populate studentSelect (hidden) so displayReport can read it
      const select = document.getElementById('studentSelect');
      select.disabled = false; select.innerHTML = '<option value="">-- เลือกนักเรียน --</option>';
      const opt = document.createElement('option'); opt.value = JSON.stringify({gradeKey: r.gradeKey, index: r.index}); opt.textContent = r.name; select.appendChild(opt); select.value = opt.value;
      // enable subject select
      document.getElementById('subjectSelect').disabled = false; document.getElementById('subjectSelect').value = '';
      box.style.display = 'none';
      displayReport();
    };
    listContainer.appendChild(item);
  });
  box.style.display = 'block';
}

// wire the search input
document.addEventListener('DOMContentLoaded', () => {
  const s = document.getElementById('searchInputReport');
  // simple debounce
  function debounce(fn, wait = 200) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
  }
  if (s) s.addEventListener('input', debounce((e) => performReportSearch(e.target.value), 180));
  document.addEventListener('click', (e) => {
    const box = document.getElementById('searchResultsReport'); if (!box) return;
    if (!box.contains(e.target) && e.target.id !== 'searchInputReport') box.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  $('#gradeSelect').addEventListener('change', () => {
    updateStudentList();
    displayReport(); // Clear report when grade changes
  });

  $('#studentSelect').addEventListener('change', () => {
    // Enable subject select when student is selected
    $('#subjectSelect').disabled = false;
    $('#subjectSelect').value = ''; // Reset subject selection
    displayReport();
  });

  $('#subjectSelect').addEventListener('change', () => {
    displayReport();
  });
});
