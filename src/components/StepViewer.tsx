import React from 'react';
import { select} from 'd3-selection';
import {NalanbotState, NalanbotAction} from '../context';

type StepViewerProps = {
  state: NalanbotState,
  action?: NalanbotAction
}

const StepViewer: React.FunctionComponent<StepViewerProps> = ({state, action}) => {
  const container = React.useRef(null);

  React.useEffect(() => {
    if (container.current) {
      const svg = select(container.current);

      // Bind bodies
      const rectangles = svg
        .selectAll('rect')
        .data(state.bodies)
        .enter()
        .append('rect');

      rectangles
        .attr('x', body => body.position[0])
        .attr('y', body => body.position[1])
        .attr('width', body => body.size[0])
        .attr('height', body => body.size[1])
        .style('fill', body => body.color_name);

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
  }, [state, container.current]);

  return <svg className="step" width={100} height={100} ref={container}/>;
};

export default StepViewer;
