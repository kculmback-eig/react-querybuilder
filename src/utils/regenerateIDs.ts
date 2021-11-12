import { generateID } from '.';
import type { RuleGroupType, RuleGroupTypeIC, RuleType } from '../types';

const regenerateID = (rule: RuleType) =>
  JSON.parse(JSON.stringify({ ...rule, id: `r-${generateID()}` }));

const regenerateIDs = (
  ruleGroup: RuleGroupType | RuleGroupTypeIC
): RuleGroupType | RuleGroupTypeIC => {
  if ('combinator' in ruleGroup) {
    const { combinator, not } = ruleGroup;
    const rules = ruleGroup.rules.map((r) => ('rules' in r ? regenerateIDs(r) : regenerateID(r)));
    return { id: `g-${generateID()}`, combinator, rules, not };
  }
  const { not } = ruleGroup;
  const rules = ruleGroup.rules.map((r) =>
    typeof r === 'string' ? r : 'rules' in r ? regenerateIDs(r) : regenerateID(r)
  );
  return { id: `g-${generateID()}`, rules, not };
};

export default regenerateIDs;