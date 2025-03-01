#include <ogdf/energybased/FMMMLayout.h>
#include "../main.h"

EM_PORT_API(FMMMLayout *)
LayoutModule_FMMMLayout(bool useHighLevelOptions, bool singleLevel, int pageFormat, double unitEdgeLength, bool newInitialPlacement, int qualityVersusSpeed, int randSeed, int edgeLengthMeasurement, int allowedPositions, int maxIntPosExponent, double pageRatio, int stepsForRotatingComponents, int tipOverCCs, double minDistCC, int presortCCs, int minGraphSize, int galaxyChoice, int randomTries, int maxIterChange, int maxIterFactor, int initialPlacementMult, int forceModel, double springStrength, double repForcesStrength, int repulsiveForcesCalculation, int stopCriterion, double threshold, int fixedIterations, double forceScalingFactor, bool coolTemperature, double coolValue, int initialPlacementForces, bool resizeDrawing, double resizingScalar, int fineTuningIterations, double fineTuneScalar, bool adjustPostRepStrengthDynamically, double postSpringStrength, double postStrengthOfRepForces, int frGridQuotient, int nmTreeConstruction, int nmSmallCell, int nmParticlesInLeaves, int nmPrecision)
{
	//LayoutModule
	FMMMLayout *model = new FMMMLayout();

	// parameters: https://ogdf.uos.de/doc/classogdf_1_1_f_m_m_m_layout.html
	// high-level-options
	model->useHighLevelOptions(useHighLevelOptions);
	model->setSingleLevel(singleLevel);
	model->pageFormat(static_cast<FMMMOptions::PageFormatType>(pageFormat));
	model->unitEdgeLength(unitEdgeLength);
	model->newInitialPlacement(newInitialPlacement);
	model->qualityVersusSpeed(static_cast<FMMMOptions::QualityVsSpeed>(qualityVersusSpeed));

	// low-level-options
	model->randSeed(randSeed);
	model->edgeLengthMeasurement(static_cast<FMMMOptions::EdgeLengthMeasurement>(edgeLengthMeasurement));
	model->allowedPositions(static_cast<FMMMOptions::AllowedPositions>(allowedPositions));
	model->maxIntPosExponent(maxIntPosExponent);

	// divide-et-impera-step-options
	model->pageRatio(pageRatio);
	model->stepsForRotatingComponents(stepsForRotatingComponents);
	model->tipOverCCs(static_cast<FMMMOptions::TipOver>(tipOverCCs));
	model->minDistCC(minDistCC);
	model->presortCCs(static_cast<FMMMOptions::PreSort>(presortCCs));

	// multilevel-step-options
	model->minGraphSize(minGraphSize);
	model->galaxyChoice(static_cast<FMMMOptions::GalaxyChoice>(galaxyChoice));
	model->randomTries(randomTries);
	model->maxIterChange(static_cast<FMMMOptions::MaxIterChange>(maxIterChange));
	model->maxIterFactor(maxIterFactor);
	model->initialPlacementMult(static_cast<FMMMOptions::InitialPlacementMult>(initialPlacementMult));

	// force-calculation-step-options
	model->forceModel(static_cast<FMMMOptions::ForceModel>(forceModel));
	model->springStrength(springStrength);
	model->repForcesStrength(repForcesStrength);
	model->repulsiveForcesCalculation(static_cast<FMMMOptions::RepulsiveForcesMethod>(repulsiveForcesCalculation));
	model->stopCriterion(static_cast<FMMMOptions::StopCriterion>(stopCriterion));
	model->threshold(threshold);
	model->fixedIterations(fixedIterations);
	model->forceScalingFactor(forceScalingFactor);
	model->coolTemperature(coolTemperature);
	model->coolValue(coolValue);
	model->initialPlacementForces(static_cast<FMMMOptions::InitialPlacementForces>(initialPlacementForces));

	// postprocessing-step-options
	model->resizeDrawing(resizeDrawing);
	model->resizingScalar(resizingScalar);
	model->fineTuningIterations(fineTuningIterations);
	model->fineTuneScalar(fineTuneScalar);
	model->adjustPostRepStrengthDynamically(adjustPostRepStrengthDynamically);
	model->postSpringStrength(postSpringStrength);
	model->postStrengthOfRepForces(postStrengthOfRepForces);

	// repulsive-force-approximation-methods-options
	model->frGridQuotient(frGridQuotient);
	model->nmTreeConstruction(static_cast<FMMMOptions::ReducedTreeConstruction>(nmTreeConstruction));
	model->nmSmallCell(static_cast<FMMMOptions::SmallestCellFinding>(nmSmallCell));
	model->nmParticlesInLeaves(nmParticlesInLeaves);
	model->nmPrecision(nmPrecision);
	return model;
}
