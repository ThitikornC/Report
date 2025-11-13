// Data - Primary School Only (ป.1-6)
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

let levelChart, subjectChart;

function $(sel) {
  return document.querySelector(sel);
}

// Collect all scores and subjects (with filtering)
function getAllScoresAndSubjects(gradeFilter = '', subjectFilter = '') {
  let allScores = [];
  let subjectMap = {}; // {subjectName: [score1, score2, ...]}

  Object.keys(studentData).forEach(gradeKey => {
    // If grade filter is set, skip other grades
    if (gradeFilter && gradeFilter !== gradeKey) return;

    const students = studentData[gradeKey];
    students.forEach(student => {
      student.subjects.forEach(subject => {
        // If subject filter is set, skip other subjects
        if (subjectFilter && subjectFilter !== subject.name) return;

        allScores.push(subject.score);
        if (!subjectMap[subject.name]) {
          subjectMap[subject.name] = [];
        }
        subjectMap[subject.name].push(subject.score);
      });
    });
  });

  return { allScores, subjectMap };
}

// Update statistics cards
function updateStats(gradeFilter = '', subjectFilter = '') {
  const { allScores, subjectMap } = getAllScoresAndSubjects(gradeFilter, subjectFilter);
  
  if (allScores.length === 0) {
    $('#totalStudents').textContent = '0';
    $('#totalSubjects').textContent = '0';
    $('#avgScoreAll').textContent = '--';
    $('#maxScoreAll').textContent = '--';
    return;
  }

  // Count total students (unique names) in filtered data
  let uniqueNames = new Set();
  let gradesInFilter = [];
  
  Object.keys(studentData).forEach(gradeKey => {
    if (gradeFilter && gradeFilter !== gradeKey) return;
    gradesInFilter.push(gradeKey);
    studentData[gradeKey].forEach(s => uniqueNames.add(s.name));
  });

  const avgScore = (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1);
  const maxScore = Math.max(...allScores);
  const uniqueSubjects = Object.keys(subjectMap).length;

  $('#totalStudents').textContent = uniqueNames.size;
  $('#totalSubjects').textContent = uniqueSubjects;
  $('#avgScoreAll').textContent = avgScore;
  $('#maxScoreAll').textContent = maxScore;
}

// Display subject cards
function displaySubjects(gradeFilter = '', subjectFilter = '') {
  const { subjectMap } = getAllScoresAndSubjects(gradeFilter, subjectFilter);
  const subjectList = $('#subjectList');
  subjectList.innerHTML = '';

  Object.entries(subjectMap).forEach(([name, scores]) => {
    const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
    const card = document.createElement('div');
    card.className = 'subject-item';
    card.innerHTML = `
      <div class="subject-name">${name}</div>
      <div class="subject-score">${avg}</div>
    `;
    subjectList.appendChild(card);
  });
}

// Get top performers across all levels (with filtering)
function getTopStudents(gradeFilter = '', subjectFilter = '') {
  let allStudents = [];

  Object.keys(studentData).forEach(gradeKey => {
    if (gradeFilter && gradeFilter !== gradeKey) return;
    
    const students = studentData[gradeKey];
    students.forEach(student => {
      let relevantSubjects = student.subjects;
      if (subjectFilter) {
        relevantSubjects = student.subjects.filter(s => s.name === subjectFilter);
      }
      
      if (relevantSubjects.length > 0) {
        const avgScore = (relevantSubjects.reduce((sum, s) => sum + s.score, 0) / relevantSubjects.length).toFixed(1);
        allStudents.push({
          name: student.name,
          score: avgScore,
          grade: student.grade
        });
      }
    });
  });

  // Sort by score descending
  allStudents.sort((a, b) => b.score - a.score);
  return allStudents.slice(0, 10); // Top 10
}

// Display top students
function displayTopStudents(gradeFilter = '', subjectFilter = '') {
  const topStudents = getTopStudents(gradeFilter, subjectFilter);
  const topStudentsDiv = $('#topStudents');
  topStudentsDiv.innerHTML = '';

  if (topStudents.length === 0) {
    topStudentsDiv.innerHTML = '<p style="color: var(--muted); text-align: center;">ไม่มีข้อมูล</p>';
    return;
  }

  topStudents.forEach((student, index) => {
    const badgeClass = index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : '';
    const rank = `${index + 1}${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : ''}`;
    const row = document.createElement('div');
    row.className = 'student-rank';
    row.innerHTML = `
      <div class="rank-badge ${badgeClass}">${rank}</div>
      <div class="student-info">
        <div class="student-name">${student.name}</div>
        <div class="student-score">คะแนนเฉลี่ย: ${student.score} (${student.grade})</div>
      </div>
    `;
    topStudentsDiv.appendChild(row);
  });
}

// Chart 1: Average score by grade (with filtering)
function createLevelChart(gradeFilter = '', subjectFilter = '') {
  const grades = ['ป1', 'ป2', 'ป3', 'ป4', 'ป5', 'ป6'];
  let visibleGrades = grades;
  let visibleLabels = ['ป.1', 'ป.2', 'ป.3', 'ป.4', 'ป.5', 'ป.6'];
  
  // If grade filter is set, show only that grade
  if (gradeFilter) {
    const idx = grades.indexOf(gradeFilter);
    visibleGrades = [grades[idx]];
    visibleLabels = [visibleLabels[idx]];
  }

  const averages = visibleGrades.map(g => {
    const { allScores } = getAllScoresAndSubjects(g, subjectFilter);
    return allScores.length > 0 ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : 0;
  });

  const ctx = document.getElementById('levelChart').getContext('2d');
  if (levelChart) levelChart.destroy();

  // Check for empty data
  const hasData = averages.some(v => v > 0);

  levelChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: hasData ? visibleLabels : ['ไม่มีข้อมูล'],
      datasets: [{
        label: 'คะแนนเฉลี่ยต่อชั้น',
        data: hasData ? averages : [0],
        backgroundColor: ['#9d8e54', '#6b2d1f', '#3d2817', '#9d8e54', '#6b2d1f', '#3d2817'],
        borderColor: '#5a5246',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      indexAxis: 'y',
      plugins: {
        legend: {
          display: true,
          labels: { color: '#5a5246' }
        }
      },
      scales: {
        x: {
          max: 100,
          ticks: { color: '#5a5246' },
          grid: { color: 'rgba(93, 82, 70, 0.1)' }
        },
        y: {
          ticks: { color: '#5a5246' },
          grid: { display: false }
        }
      }
    }
  });
}

// Chart 2: Average score by subject (with filtering)
function createSubjectChart(gradeFilter = '', subjectFilter = '') {
  const { subjectMap } = getAllScoresAndSubjects(gradeFilter, subjectFilter);
  const subjects = Object.keys(subjectMap);
  
  // If no data, show empty chart
  if (subjects.length === 0) {
    const ctx = document.getElementById('subjectChart').getContext('2d');
    if (subjectChart) subjectChart.destroy();
    subjectChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['ไม่มีข้อมูล'],
        datasets: [{
          label: 'ไม่มีข้อมูล',
          data: [0]
        }]
      }
    });
    return;
  }

  const averages = subjects.map(s => (subjectMap[s].reduce((a, b) => a + b, 0) / subjectMap[s].length).toFixed(1));

  const ctx = document.getElementById('subjectChart').getContext('2d');
  if (subjectChart) subjectChart.destroy();

  subjectChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: subjects,
      datasets: [{
        label: 'คะแนนเฉลี่ย',
        data: averages,
        borderColor: '#9d8e54',
        backgroundColor: 'rgba(157, 142, 84, 0.2)',
        borderWidth: 2,
        pointBackgroundColor: '#6b2d1f',
        pointBorderColor: '#faf8f3',
        pointBorderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          labels: { color: '#5a5246' }
        }
      },
      scales: {
        r: {
          max: 100,
          ticks: { color: '#5a5246' },
          grid: { color: 'rgba(93, 82, 70, 0.2)' }
        }
      }
    }
  });
}

// Search functionality - Show matching student names as dropdown list
function performSearch(searchQuery) {
  const searchResults = $('#searchResults');
  const searchResultsList = $('#searchResultsList');

  if (!searchQuery.trim()) {
    searchResults.classList.remove('show');
    return;
  }

  const query = searchQuery.toLowerCase();
  let matchedStudents = [];
  
  // Get unique students (not duplicated per subject)
  const uniqueStudents = {};
  Object.keys(studentData).forEach(gradeKey => {
    studentData[gradeKey].forEach(student => {
      if (student.name.toLowerCase().includes(query)) {
        if (!uniqueStudents[student.name]) {
          uniqueStudents[student.name] = {
            name: student.name,
            grade: student.grade,
            gradeKey: gradeKey
          };
        }
      }
    });
  });

  matchedStudents = Object.values(uniqueStudents);
  searchResultsList.innerHTML = '';

  if (matchedStudents.length === 0) {
    searchResultsList.innerHTML = '<div class="no-search-results">ไม่พบผลการค้นหา</div>';
    searchResults.classList.add('show');
    return;
  }

  matchedStudents.forEach(student => {
    const item = document.createElement('div');
    item.className = 'search-result-item';
    item.innerHTML = `
      <div class="search-result-name">${student.name}</div>
      <div class="search-result-grade">ชั้น ${student.grade}</div>
    `;
    item.style.cursor = 'pointer';
    item.onclick = () => {
      $('#searchInput').value = student.name;
      // Set grade filter
      $('#filterGrade').value = 'ป' + student.grade.split('.')[1];
      // Trigger dashboard update
      const event = new Event('change');
      $('#filterGrade').dispatchEvent(event);
      // Hide results
      searchResults.classList.remove('show');
    };
    searchResultsList.appendChild(item);
  });

  searchResults.classList.add('show');
}
document.addEventListener('DOMContentLoaded', () => {
  // Debug: Check if elements exist
  console.log('filterGrade:', $('#filterGrade'));
  console.log('filterSubject:', $('#filterSubject'));

  function refreshDashboard() {
    const gradeFilter = $('#filterGrade').value;
    const subjectFilter = $('#filterSubject').value;
    
    console.log('Grade:', gradeFilter, 'Subject:', subjectFilter);
    
    updateStats(gradeFilter, subjectFilter);
    displaySubjects(gradeFilter, subjectFilter);
    displayTopStudents(gradeFilter, subjectFilter);
    createLevelChart(gradeFilter, subjectFilter);
    createSubjectChart(gradeFilter, subjectFilter);
  }

  // Initial load
  refreshDashboard();

  // Add event listeners
  if ($('#filterGrade')) $('#filterGrade').addEventListener('change', refreshDashboard);
  if ($('#filterSubject')) $('#filterSubject').addEventListener('change', refreshDashboard);
  if ($('#searchInput')) {
    $('#searchInput').addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }
});
