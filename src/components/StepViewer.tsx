import React from 'react';
import {select} from 'd3-selection';
import {scaleLinear} from 'd3-scale';
import {NalanbotState, NalanbotAction} from '../context';

type StepViewerProps = {
  state: NalanbotState;
  action?: NalanbotAction;
};

const StepViewer: React.FunctionComponent<StepViewerProps> = ({
  state,
  action,
}) => {
  const container = React.useRef(null);
  const width: number = 100,
    height: number = 100;

  React.useEffect(() => {
    if (container.current) {
      const svg = select(container.current);
      const workspace = [
        [0.25, -0.2, 0.02],
        [0.5, 0.2, 0.3],
      ];
      const xScale = scaleLinear()
        .domain([workspace[0][0], workspace[1][0]])
        .range([0, width]);

      const yScale = scaleLinear()
        .domain([workspace[0][1], workspace[1][1]])
        .range([height, 0]);

      // Bind bodies
      const rectangles = svg
        .selectAll('rect')
        .data(state.bodies)
        .enter()
        .append('rect');

      rectangles
        .attr('x', body => xScale(body.position[0]))
        .attr('y', body => yScale(body.position[1]))
        .attr('width', body => 100 * body.size[0])
        .attr('height', body => 100 * body.size[1])
        .attr('fill', body => body.color_name)
	    .attr('opacity', 0.5);

      rectangles.exit().remove();

      // Bind manipulator
      // 			const manipulator = svg.selectAll("rect")
      // 	.data(state.manipulator)
      // 	.enter()
      // 		.append("rect");

      // 	const attrManipulator = rectangles
      // 	.attr("x", body => manipulator.position[0])
      // 	.attr("y", body => body.position[1])
      // 	.attr("width", body => body.size[0])
      // 	.attr("height", body => body.size[1])
      // 		.style("fill", body => body.color_name);
      //
    }
  }, [state]);

  return (
	  <svg className="step" width={width} height={height} ref={container} style={{border: "1px black solid"}}/>
  );
};

export default StepViewer;
