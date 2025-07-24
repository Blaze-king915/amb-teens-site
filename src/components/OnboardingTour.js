import React, { useEffect, useState } from 'react';
import Joyride from 'react-joyride';

const OnboardingTour = ({ manualStart = false }) => {
  const [run, setRun] = useState(false);
  const [stepsReady, setStepsReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const isMobile = window.innerWidth <= 768;

  const mobileSteps = [
    { target: '.bottomnav-dashboard', content: 'This is your dashboard.' },
    { target: '.bottomnav-lessons', content: 'Click to view lessons.' },
    { target: '.bottomnav-quizzes', content: 'Find all quizzes here.' },
    { target: '.bottomnav-leaderboard', content: 'See your rank.' },
    { target: '.bottomnav-settings', content: 'Change your preferences here.' },
    {
      target: '.bottomnav-lessons',
      content:
        '📌 Note! Lesson 48 is opened automatically. To unlock others, earn points by completing lessons and quizzes.',
    },
  ];

  const desktopSteps = [
    { target: '.sidebar-dashboard', content: 'This is your dashboard.' },
    { target: '.sidebar-lessons', content: 'Click to view lessons.' },
    { target: '.sidebar-quizzes', content: 'Find all quizzes here.' },
    { target: '.sidebar-leaderboard', content: 'See your rank.' },
    { target: '.sidebar-settings', content: 'Change your preferences here.' },
    { target: '.announcement-box', content: 'Important announcements here.' },
    { target: '.stat-card:first-child', content: 'Your progress is shown here.' },
    {
      target: '.sidebar-lessons',
      content:
        '📌 Note! Lesson 48 is opened automatically. To unlock others, earn points by completing lessons and quizzes.',
    },
  ];

  const steps = isMobile ? mobileSteps : desktopSteps;

  const getValidSteps = () => {
    return steps
      .filter((step) => {
        const el = document.querySelector(step.target);
        return el && el.offsetParent !== null;
      })
      .map((step) => ({
        ...step,
        disableBeacon: true,
      }));
  };

  useEffect(() => {
    const hasCompletedTour = localStorage.getItem('tourCompleted');
    const justLoggedIn = localStorage.getItem('justLoggedIn');

    const timeout = setTimeout(() => {
      const validSteps = getValidSteps();
      if (validSteps.length > 0) {
        setStepsReady(true);
        if ((!hasCompletedTour && justLoggedIn === 'true') || manualStart) {
          setStepIndex(0);
          setRun(true);
        }
      }

      localStorage.removeItem('justLoggedIn');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [manualStart]);

  const handleTourEnd = (data) => {
    const { status, index, type } = data;

    if (type === 'step:after') {
      setStepIndex(index + 1);
    }

    if (status === 'finished' || status === 'skipped') {
      localStorage.setItem('tourCompleted', 'true');
      setRun(false);
      setStepIndex(0);
    }

    if (type === 'tour:end') {
      setRun(false);
      setStepIndex(0);
    }
  };

  return (
    <>
      {stepsReady && (
        <Joyride
          steps={getValidSteps()}
          run={run}
          stepIndex={stepIndex}
          showSkipButton
          continuous
          scrollToFirstStep
          scrollOffset={60}
          disableOverlayClose
          spotlightClicks
          disableScrolling={false}
          styles={{
            options: {
              zIndex: 99999,
              primaryColor: '#3b82f6',
              backgroundColor: '#fff',
              textColor: '#333',
              arrowColor: '#fff',
            },
          }}
          callback={handleTourEnd}
          floaterProps={{ disableAnimation: true }}
          locale={{ last: 'Got it!' }}
          disableBeacon={true}
        />
      )}
    </>
  );
};

export default OnboardingTour;
