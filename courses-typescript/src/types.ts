interface _CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface _CoursePartBasic extends _CoursePartBase {
  description: string;
}

// Usable Types. NOTE: I dont know if using _ as a prefix is a good idea to denote if the type
// is a "base" type or a "final" type with kind as a parameter, will revise and refactor later
// if necesary.
export interface CoursePartBasic extends _CoursePartBasic {
  kind: 'basic';
}

export interface CoursePartGroup extends _CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

export interface CoursePartBackground extends _CoursePartBasic {
  backgroundMaterial: string;
  kind: 'background';
}

// Custom interface with that includes 'description'
export interface CoursePartSpecial extends _CoursePartBasic {
  requirements: string[];
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
