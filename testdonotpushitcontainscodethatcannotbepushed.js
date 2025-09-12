const test = () => {
  const isAdditionalFeesSelected = true;
  const Grid = <></>;
  const Comp = () => <></>;
  return (
    <>
      {isAdditionalFeesSelected && (
        <Grid item xs={12} className="sub-total-sec">
          <Comp />
        </Grid>
      )}
    </>
  );
};

const test2 = () => {
  const truee = true;
  if (truee === true) {
    return 'hi';
  }
  if (truee) {
    return 'hi';
    if ('no') {
      return 'hi';
    }
  }
};

/* in this test it will format correctly if formatting on save, but will not if formatting manually one at a time. it takes two steps to correct it. you have to remove the paren on line 8 and then update line 7 to have the paren, it is not in one fix. formatting on save must lock the changes in before execution. the issue is when manually fixing, if you first fix the step of adding the paren to line 7 then the code breaks including linting because there is an unexpected paren. if you fix line 8 first in removing the paren, again the code and linting breaks because there is a closing paren hanging on line 11 now with no opening paren. so because the fix takes two steps and the code breaks no matter which step you do first, it must be corrected by hand and fixing with linting will only create errors. a potential fix would be somehow bringing these two actions into one, but that would only fix this one specific combo. to fix all of these possible scenarios, when a rule fix is created any relating fixes should be executed in sync as one. right now it seems that even though the two changes are from one rule fix call the changes are executed line by line. thats ok but i think if any lines are connected in a fix they should all resolve even if it affects multiple lines. */
