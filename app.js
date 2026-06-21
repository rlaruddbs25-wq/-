// Book Report Helper - Main client JavaScript (Pure Frontend with localStorage)

document.addEventListener('DOMContentLoaded', function() {
    
    // UI Elements
    const reportForm = document.getElementById('report-form');
    const reportIdInput = document.getElementById('report-id');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const readRangeInput = document.getElementById('read-range');
    const summaryInput = document.getElementById('summary');
    const sceneInput = document.getElementById('scene');
    const feelingInput = document.getElementById('feeling');
    
    const btnGenerate = document.getElementById('btn-generate-draft');
    const draftTextarea = document.getElementById('draft_content');
    const draftPlaceholder = document.getElementById('draft-placeholder');
    const draftEditorWrapper = document.getElementById('draft-editor-wrapper');
    
    const btnSave = document.getElementById('btn-save-report');
    const btnNewReport = document.getElementById('btn-new-report');
    const btnPrint = document.getElementById('btn-print');
    const logoRefresh = document.getElementById('logo-refresh');
    
    const reportsListContainer = document.getElementById('reports-list-container');
    const toast = document.getElementById('toast');

    // 1. Initialize and Load reports from localStorage
    loadReports();

    // 2. Logo / New Report Click -> Reset form to default blank
    logoRefresh.addEventListener('click', function(e) {
        e.preventDefault();
        resetForm();
    });
    
    btnNewReport.addEventListener('click', function() {
        resetForm();
        showToast('📝 새 독서 감상문 작성 모드가 되었습니다.');
    });

    // 3. Question Recommendation Accordion
    const questionTriggers = document.querySelectorAll('.question-trigger');
    questionTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent) {
                const isOpen = targetContent.classList.contains('show');
                
                // Close all other question contents
                document.querySelectorAll('.question-content').forEach(content => {
                    content.classList.remove('show');
                });
                
                // Toggle target
                if (!isOpen) {
                    targetContent.classList.add('show');
                }
            }
        });
    });

    // 4. Question Template Hint Inserter
    const insertButtons = document.querySelectorAll('.btn-insert-hint');
    insertButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetFieldId = this.getAttribute('data-field');
            const hintText = this.getAttribute('data-hint');
            const targetField = document.getElementById(targetFieldId);
            
            if (targetField) {
                targetField.focus();
                
                if (targetField.value.trim() !== '') {
                    if (confirm('작성 중인 내용이 있습니다. 힌트 질문 템플릿을 추가하시겠습니까?')) {
                        targetField.value += '\n' + hintText + ' ';
                    }
                } else {
                    targetField.value = hintText + ' ';
                }
                
                // Guide user eye via color flash
                targetField.style.borderColor = 'var(--primary-color)';
                setTimeout(() => {
                    targetField.style.borderColor = '';
                }, 1000);
            }
        });
    });

    // 5. Draft Auto Generation
    btnGenerate.addEventListener('click', function() {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const readRange = readRangeInput.value.trim() || '완독';
        const summary = summaryInput.value.trim();
        const scene = sceneInput.value.trim();
        const feeling = feelingInput.value.trim();

        if (!title || !author) {
            alert('책 제목과 저자는 초안 작성을 위한 필수 입력 항목입니다!');
            if (!title) titleInput.focus();
            else authorInput.focus();
            return;
        }

        // Formulate components with default strings if empty
        const summarySentence = summary ? summary : '(줄거리를 입력하면 더욱 풍성한 글이 완성됩니다.)';
        const sceneSentence = scene ? scene : '(가장 기억에 남는 특별한 인상 깊은 장면을 넣어주세요.)';
        const feelingSentence = feeling ? feeling : '(이 책을 다 읽고 마음속에 떠오른 느낀 점을 간단히 적어보세요.)';

        // Base template structure
        const intro = `이번에 내가 읽은 책은 ${author} 작가가 쓴 '${title}'이다. 이 책을 '${readRange}' 구간까지 꼼꼼히 읽어나가며 저자가 글 속에 담아둔 숨은 메시지가 무엇일지 깊이 궁금해졌다. 책을 펼쳐 들기 전부터 기대가 컸는데, 첫 페이지를 열자마자 흥미진진한 흐름에 이끌려 아주 쉽게 몰입하여 독서를 시작할 수 있었다.`;

        const body = `이 책의 주요 흐름과 줄거리를 간략하게 짚어보자면 다음과 같다.\n${summarySentence}\n\n이야기가 전개되는 과정 중에서 내 머릿속에 가장 강렬하게 인상 깊었던 장면은 바로 '${sceneSentence}' 부분이다. 이 장면에 등장하는 묘사와 감정은 긴장감을 불러일으켰을 뿐만 아니라, 작품이 지닌 무게감을 생생하게 느끼게 해주었다.`;

        const conclusion = `이 책을 완전히 마무리하고 곱씹어 보면서, 나는 결국 '${feelingSentence}'라는 깨달음과 진솔한 느낌을 안게 되었다. '${title}'은 나에게 활자 이상의 성찰을 이끌어내 준 고마운 작품이다. 앞으로도 일상 속에서 이 책이 준 교훈을 잊지 않고 마음속에 담아두려 하며, 주변 친구들에게도 이 책을 적극적으로 권해주고 싶다.`;

        const fullDraft = `[서론]\n${intro}\n\n[본론]\n${body}\n\n[결론]\n${conclusion}`;

        draftTextarea.value = fullDraft;
        
        // Show Editor, Hide Placeholder
        draftPlaceholder.style.display = 'none';
        draftEditorWrapper.style.display = 'block';
        btnPrint.style.display = 'inline-flex'; // Show print button once draft is ready

        showToast('⚡ 초안이 작성 내용 기반으로 조합되었습니다!');
    });

    // 6. Save Report to localStorage
    btnSave.addEventListener('click', function(e) {
        e.preventDefault();
        
        const id = reportIdInput.value;
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const readRange = readRangeInput.value.trim();
        const summary = summaryInput.value.trim();
        const scene = sceneInput.value.trim();
        const feeling = feelingInput.value.trim();
        const draftContent = draftTextarea.value.trim();

        if (!title || !author) {
            alert('책 제목과 저자는 필수 입력 항목입니다.');
            return;
        }

        if (!draftContent) {
            alert('초안을 먼저 생성한 후 수정하여 저장해 주세요.');
            return;
        }

        let reports = JSON.parse(localStorage.getItem('book_reports')) || [];
        const now = new Date().toLocaleString('ko-KR');

        if (id) {
            // Update Existing Report
            reports = reports.map(item => {
                if (item.id === id) {
                    return {
                        ...item,
                        title, author, readRange, summary, scene, feeling, draftContent,
                        updatedAt: now
                    };
                }
                return item;
            });
            showToast('💾 독서 감상문이 정상적으로 수정되었습니다.');
        } else {
            // Create New Report
            const newId = 'report_' + Date.now();
            const newReport = {
                id: newId,
                title, author, readRange, summary, scene, feeling, draftContent,
                createdAt: now,
                updatedAt: now
            };
            reports.push(newReport);
            reportIdInput.value = newId; // Set ID so further clicks update instead of create
            showToast('💾 독서 감상문이 서랍에 저장되었습니다.');
        }

        localStorage.setItem('book_reports', JSON.stringify(reports));
        loadReports();
    });

    // 7. Print Feature (Print mapping)
    btnPrint.addEventListener('click', function() {
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const readRange = readRangeInput.value.trim() || '완독';
        const draftContent = draftTextarea.value.trim();

        if (!title || !draftContent) {
            alert('인쇄할 내용이 부족합니다. 먼저 감상문을 작성해 주세요.');
            return;
        }

        // Map data to print areas
        document.getElementById('print-title').textContent = `『${title}』 독서 감상문`;
        document.getElementById('print-author').textContent = `저자: ${author}`;
        document.getElementById('print-range').textContent = `읽은 범위: ${readRange}`;
        document.getElementById('print-date').textContent = `작성일: ${new Date().toLocaleDateString('ko-KR')}`;
        document.getElementById('print-content').textContent = draftContent;

        // Trigger native print dialog
        window.print();
    });

    // --- Helper Functions ---

    // Load and render reports list
    function loadReports() {
        const reports = JSON.parse(localStorage.getItem('book_reports')) || [];
        reportsListContainer.innerHTML = '';

        if (reports.length === 0) {
            reportsListContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📂</div>
                    <p style="font-weight:600; margin-bottom: 0.2rem;">아직 저장된 감상문이 없습니다.</p>
                    <p style="font-size:0.82rem; color:var(--text-muted);">위의 폼을 작성해 첫 감상문을 저장해 보세요.</p>
                </div>
            `;
            return;
        }

        // Sort by updatedAt descending
        const sortedReports = [...reports].sort((a, b) => {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        sortedReports.forEach(report => {
            const reportItem = document.createElement('div');
            reportItem.className = 'report-item';
            
            reportItem.innerHTML = `
                <div class="report-info">
                    <span class="report-title-link" data-id="${report.id}">${report.title}</span>
                    <div class="report-meta">
                        <span><strong>저자:</strong> ${report.author}</span>
                        <span><strong>읽은 범위:</strong> ${report.readRange || '기록 없음'}</span>
                        <span><strong>수정일:</strong> ${report.updatedAt}</span>
                    </div>
                </div>
                <div class="report-actions">
                    <button type="button" class="btn btn-outline btn-mini btn-load" data-id="${report.id}">불러오기</button>
                    <button type="button" class="btn btn-danger btn-mini btn-delete" data-id="${report.id}">삭제</button>
                </div>
            `;
            reportsListContainer.appendChild(reportItem);
        });

        // Attach event listeners to newly generated buttons
        document.querySelectorAll('.report-title-link, .btn-load').forEach(el => {
            el.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                loadReportToForm(id);
            });
        });

        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                deleteReport(id);
            });
        });
    }

    // Load specific report content into the editor inputs
    function loadReportToForm(id) {
        const reports = JSON.parse(localStorage.getItem('book_reports')) || [];
        const report = reports.find(item => item.id === id);

        if (report) {
            reportIdInput.value = report.id;
            titleInput.value = report.title;
            authorInput.value = report.author;
            readRangeInput.value = report.readRange || '';
            summaryInput.value = report.summary || '';
            sceneInput.value = report.scene || '';
            feelingInput.value = report.feeling || '';
            draftTextarea.value = report.draftContent || '';

            // Toggle Editor Area
            draftPlaceholder.style.display = 'none';
            draftEditorWrapper.style.display = 'block';
            btnPrint.style.display = 'inline-flex';

            // Scroll smoothly back to top editor section
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showToast(`📂 '${report.title}' 감상문을 성공적으로 불러왔습니다!`);
        }
    }

    // Delete a report
    function deleteReport(id) {
        const reports = JSON.parse(localStorage.getItem('book_reports')) || [];
        const report = reports.find(item => item.id === id);
        
        if (report && confirm(`'${report.title}' 감상문을 삭제하시겠습니까?`)) {
            const updated = reports.filter(item => item.id !== id);
            localStorage.setItem('book_reports', JSON.stringify(updated));
            
            // If the deleted report is currently open in form, reset form
            if (reportIdInput.value === id) {
                resetForm();
            }
            
            loadReports();
            showToast('🗑️ 감상문이 삭제되었습니다.');
        }
    }

    // Reset Form inputs
    function resetForm() {
        reportIdInput.value = '';
        reportForm.reset();
        draftTextarea.value = '';
        
        // Hide editor, show placeholder
        draftPlaceholder.style.display = 'flex';
        draftEditorWrapper.style.display = 'none';
        btnPrint.style.display = 'none';
        
        // Close accordion elements
        document.querySelectorAll('.question-content').forEach(content => {
            content.classList.remove('show');
        });
    }

    // Toast Notification helper
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2800);
    }
});
