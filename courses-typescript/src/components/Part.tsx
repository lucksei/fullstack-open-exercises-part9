import type { CoursePart } from '../types';

const Part = (props: { coursePart: CoursePart }) => {
  const coursePart = props.coursePart;
  switch (coursePart.kind) {
    case 'basic': {
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div>
            <i>{coursePart.description}</i>
          </div>
        </div>
      );
    }
    case 'group': {
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div>group project count: {coursePart.groupProjectCount}</div>
        </div>
      );
    }
    case 'background': {
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <div>Background material: {coursePart.backgroundMaterial}</div>
        </div>
      );
    }
    case 'special': {
      return (
        <div>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <div>
            <i>{coursePart.description}</i>
          </div>
          <div>Required skills: {coursePart.requirements.join(', ')}</div>
        </div>
      );
    }
    default: {
      return null;
    }
  }
};

export default Part;
