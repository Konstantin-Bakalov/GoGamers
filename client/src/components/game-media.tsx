import { Box, Button, MobileStepper } from '@mui/material';
import { useState } from 'react';
import { MediaModel } from 'shared';
import { Image } from './image';
import { Video } from './video';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

interface GameMediaProps {
    media: MediaModel[];
}

export function GameMedia({ media }: GameMediaProps) {
    const [activeStep, setActiveStep] = useState(0);

    const maxSteps = media.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <Box sx={{ maxWidth: '400px' }}>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="small"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {<KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {<KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
            <SwipeableViews
                index={activeStep}
                autoPlay={false}
                animateHeight
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {media.map((med, index) =>
                    med.type === 'image' ? (
                        <Image key={index} imageUrl={med.url} />
                    ) : (
                        <Video key={index} videoUrl={med.url} controls={true} />
                    ),
                )}
            </SwipeableViews>
        </Box>
    );
}
