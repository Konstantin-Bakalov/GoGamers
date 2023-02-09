import { Box, Button, MobileStepper } from '@mui/material';
import { useState } from 'react';
import { MediaModel } from 'shared';
import { Image } from './image';
import { Video } from './video';
import SwipeableViews from 'react-swipeable-views';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { makeStyles } from '../lib/make-styles';

interface GameMediaProps {
    media: MediaModel[];
}

const styles = makeStyles({
    container: {
        maxWidth: '650px',
    },
    media: {
        objectFit: 'cover',
        objectPosition: 'top left',
        height: '370px',
    },
    border: {
        borderRadius: '.5rem',
    },
});

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
        <Box sx={styles.container}>
            <SwipeableViews
                index={activeStep}
                autoPlay={false}
                hysteresis={0.3}
                onChangeIndex={handleStepChange}
                enableMouseEvents
                style={styles.border}
            >
                {media.map((med, index) =>
                    med.type === 'image' ? (
                        <Image
                            style={styles.media}
                            key={index}
                            imageUrl={med.url}
                        />
                    ) : (
                        <Video
                            style={styles.media}
                            key={index}
                            videoUrl={med.url}
                            controls={true}
                        />
                    ),
                )}
            </SwipeableViews>
            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {<KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button
                        size="large"
                        onClick={handleBack}
                        disabled={activeStep === 0}
                    >
                        {<KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}
