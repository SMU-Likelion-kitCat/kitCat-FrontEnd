import React, { useState, useRef, useEffect } from 'react';
import { ReactComponent as BackArrow } from "../../../assets/auth/register/BackArrow.svg";
import { ReactComponent as Close } from "../../../assets/routine/Close.svg";
import { ReactComponent as DropBoxArrow } from "../../../assets/routine/DropBoxArrow.svg";
import { ReactComponent as GreenCheck } from "../../../assets/routine/GreenCheck.svg";
import { ReactComponent as Check } from "../../../assets/routine/Check.svg";
import { ReactComponent as ResetTurn } from "../../../assets/routine/ResetTurn.svg";
import { ReactComponent as Exclam } from "../../../assets/routine/Exclamation.svg";
import { useNavigate, useLocation } from 'react-router-dom';

const RoutineEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routine = location.state?.routine; // Directly access routine from state

  console.log('Received routine data:', routine); // Debugging line

  const [isModalOpen, setModalOpen] = useState(false);
  const [isUnitDropdownOpen, setUnitDropdownOpen] = useState(false);
  const [isAmountDropdownOpen, setAmountDropdownOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(routine?.unit || '하루');
  const [selectedAmount, setSelectedAmount] = useState(routine?.amount || '1');
  const [routineName, setRoutineName] = useState(routine?.title || '');
  const [finalGoal, setFinalGoal] = useState(routine?.goal || '');
  const [stepGoalUnit, setStepGoalUnit] = useState(routine?.step || '');
  const [selectedDuration, setSelectedDuration] = useState(routine?.duration || '1주');
  const [todayDate, setTodayDate] = useState(new Date());
  const [selectedColor, setSelectedColor] = useState(routine?.highlight || null);
  const [selectedRoutineType, setSelectedRoutineType] = useState(routine?.type || '');

  const colors = ['#F8DEDE', '#FCF1DB', '#ECFAE0', '#E1F0FB', '#F1EBF9', '#FFEAF4'];

  useEffect(() => {
    setTodayDate(new Date());
  }, []);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };
    const formatter = new Intl.DateTimeFormat('ko-KR', options);
    const parts = formatter.formatToParts(date);

    const day = parts.find(part => part.type === 'day').value;
    const month = parts.find(part => part.type === 'month').value;
    const year = parts.find(part => part.type === 'year').value;
    const weekday = parts.find(part => part.type === 'weekday').value;

    return `${year}.${month}.${day} (${weekday})`;
  };
  
  const unitDropdownRef = useRef(null);
  const amountDropdownRef = useRef(null);

  const handleCancle = () => {
    navigate(`../ongoing/${routine.id}`);
};

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`../ongoing/${routine.id}`);

    const routineTypeMapping = {
      '시간 목표를 달성하는 방식': '시간 목표',
      '칼로리 목표를 달성하는 방식': '칼로리 목표',
      '산책 거리 목표를 달성하는 방식': '산책 거리 목표'
    };

    console.log({
      routineName,
      selectedRoutineType: routineTypeMapping[selectedRoutineType] || selectedRoutineType, // Use mapped value
      finalGoal,
      stepGoalUnit,
      selectedDuration,
      selectedUnit,
      selectedAmount,
      startDate: formatDate(todayDate),
      selectedColor,
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleMoreClick_Back = () => {
    navigate('../../routine');
  };

  const toggleUnitDropdown = () => {
    setUnitDropdownOpen(!isUnitDropdownOpen);
  };

  const toggleAmountDropdown = () => {
    setAmountDropdownOpen(!isAmountDropdownOpen);
  };

  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
    setUnitDropdownOpen(false);
  };

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setAmountDropdownOpen(false);
  };

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleRoutineTypeSelect = (type) => {
    setSelectedRoutineType(type);
    closeModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (unitDropdownRef.current && !unitDropdownRef.current.contains(event.target)) {
        setUnitDropdownOpen(false);
      }
      if (amountDropdownRef.current && !amountDropdownRef.current.contains(event.target)) {
        setAmountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getFinalGoalLabel = () => {
    switch (selectedRoutineType) {
      case '시간 목표를 달성하는 방식':
        return '최종 목표 시간';
      case '칼로리 목표를 달성하는 방식':
        return '최종 목표 칼로리';
      case '산책 거리 목표를 달성하는 방식':
        return '최종 목표 거리';
      default:
        return '최종 목표';
    }
  };

  const getFinalGoalUnit = () => {
    switch (selectedRoutineType) {
      case '시간 목표를 달성하는 방식':
        return '분';
      case '칼로리 목표를 달성하는 방식':
        return 'kcal';
      case '산책 거리 목표를 달성하는 방식':
        return 'm';
      default:
        return '';
    }
  };

  const isFormValid = () => {
    return (
      routineName &&
      finalGoal &&
      stepGoalUnit &&
      selectedUnit &&
      selectedAmount &&
      selectedDuration &&
      selectedColor &&
      selectedRoutineType
    );
  };

  return (
    <div className='setroutine-container'>
      <div className='setroutine-header'>
        <BackArrow onClick={handleMoreClick_Back} className='setroutine-back-button' />
        <h1 className='setroutine-title'>루틴 수정하기</h1>
      </div>
      <form className="setroutine-wrapper" onSubmit={handleSubmit}>
        <div className="setroutine-set-container">
          <div className="setroutine-set-title">루틴 이름</div>
          <div className="setroutine-set-input">
            <input className='set-font'
              placeholder="루틴 이름 입력"
              value={routine.title}
              onChange={(e) => setRoutineName(e.target.value)}
            />
          </div>
        </div>

        <div className="setroutine-set-container">
          <div className="setroutine-set-title">루틴 유형</div>
          <button
            className={`setroutine-set-button ${selectedRoutineType ? 'selected' : ''}`}
            onClick={handleClick}
          >
            {selectedRoutineType || '루틴 유형 선택'}
            <DropBoxArrow />
          </button>
        </div>
        {selectedRoutineType && (
          <>
            <div className="setroutine-set-container sub-page">
              <div className="setroutine-set-title">{getFinalGoalLabel()}</div>
              <div className="setroutine-set-input">
                <input className='set-font'
                  placeholder={`${getFinalGoalLabel()} 입력`}
                  value={finalGoal}
                  onChange={(e) => setFinalGoal(e.target.value)}
                />
                <span className="unit">{getFinalGoalUnit()}</span>
              </div>
            </div>

            <div className="setroutine-set-container sub-page">
              <div className="setroutine-set-title">단계별 목표 단위</div>
              <div className="setroutine-set-input">
                <input className='set-font'
                  placeholder="단계별 목표 단위"
                  value={stepGoalUnit}
                  onChange={(e) => setStepGoalUnit(e.target.value)}
                />
                <span className="unit">{getFinalGoalUnit()}</span>
              </div>
              <div className='setroutine-manual'>
                <Exclam className='exclam-icon' />
                <h1 className='exclam-text'>루틴 기간동안 점진적으로 수행할 단위를 입력해요</h1>
              </div>
            </div>
          </>
        )}

        <div className="setroutine-set-container">
          <div className="setroutine-set-title">루틴 기간</div>
          <div className="setroutine-set-duration">
            {['1주', '2주', '3주', '4주'].map((duration) => (
              <button
                key={duration}
                className={`duration-block ${selectedDuration === duration ? 'selected' : ''}`}
                onClick={() => handleDurationSelect(duration)}
                type="button"
              >
                {duration}
              </button>
            ))}
          </div>
        </div>

        <div className="setroutine-set-container">
          <div className="setroutine-set-title">루틴 빈도</div>
          <div className="setroutine-set-frequency">
            <span style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="dropdown" ref={unitDropdownRef}>
                <button className="dropdown-button" onClick={toggleUnitDropdown} type="button">
                  {selectedUnit}
                  <DropBoxArrow className={`up-arrow ${isUnitDropdownOpen ? 'open' : ''}`} />
                </button>
                {isUnitDropdownOpen && (
                  <div className="dropdown-menu">
                    {['하루', '일주일'].map(unit => (
                      <div
                        key={unit}
                        className="dropdown-item"
                        onClick={() => handleUnitSelect(unit)}
                      >
                        {unit}
                        {selectedUnit === unit && <GreenCheck className="green-check-icon" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className='text'>에</span>
              <div className="dropdown day" ref={amountDropdownRef}>
                <button className="dropdown-button day" onClick={toggleAmountDropdown} type="button">
                  {selectedAmount}
                  <DropBoxArrow className={`up-arrow ${isAmountDropdownOpen ? 'open' : ''}`} />
                </button>
                {isAmountDropdownOpen && (
                  <div className="dropdown-menu day">
                    {[...Array(10).keys()].map(i => (
                      <div
                        key={i + 1}
                        className="dropdown-item"
                        onClick={() => handleAmountSelect(i + 1)}
                      >
                        {i + 1}
                        {selectedAmount == i + 1 && <GreenCheck className="green-check-icon" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <span className='text'>번 할래요</span>
            </span>
          </div>
        </div>

        <div className="setroutine-set-container">
          <div className="setroutine-set-title">루틴 시작일</div>
          <div className="setroutine-set-input">
            <p className='date'>{formatDate(todayDate)}</p>
          </div>
        </div>

        <div className="setroutine-set-container">
          <div className="setroutine-set-title">하이라이트</div>
          <div className="setroutine-set-color">
            {colors.map(color => (
              <div
                key={color}
                className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              >
                {selectedColor === color && <Check className='checkmark' />}
              </div>
            ))}
          </div>
        </div>

        <div className='setroutine-button-wrap'>
          <div className='reset'>
            <ResetTurn className='resetturn-icon' />
            <button type="button" className="setroutine-reset-button" onClick={handleCancle}>취소</button>
          </div>

          <button type="submit" className="setroutine-save-button" disabled={!isFormValid()}>
            완료
          </button>
        </div>
      </form>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h2 className='modal-title'>루틴 유형</h2>
              <Close className='modal-icon' onClick={closeModal} />
            </div>
            <ul>
              <li onClick={() => handleRoutineTypeSelect('시간 목표를 달성하는 방식')}>시간 목표를 달성하는 방식</li>
              <li onClick={() => handleRoutineTypeSelect('칼로리 목표를 달성하는 방식')}>칼로리 목표를 달성하는 방식</li>
              <li onClick={() => handleRoutineTypeSelect('산책 거리 목표를 달성하는 방식')}>산책 거리 목표를 달성하는 방식</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoutineEdit;
