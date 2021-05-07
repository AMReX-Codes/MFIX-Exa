.. sec:InputsDiscretization:

Discretization
==============

+---------------------------+-----------------------------------------------------------------------+-------------+--------------+
| Key                       | Description                                                           |   Type      | Default      |
+===========================+=======================================================================+=============+==============+
| use_drag_coeff_in_proj_gp | Algebraically consistent p coeff in proj or (default) simplified form |   Bool      |  False       |
+---------------------------+-----------------------------------------------------------------------+-------------+--------------+
| advection_type            | Predictor-Corrector Method of Lines ("mol") or Godunov ("godunov")    |   String    |  mol         |
+---------------------------+-----------------------------------------------------------------------+-------------+--------------+
| use_drag_in_godunov       | Include a drag term in the Godunov flux or (default) not              |   Bool      |  False       |
+---------------------------+-----------------------------------------------------------------------+-------------+--------------+
| redistribution_type       | Use flux ("FluxRedist"), state ("StateRedist") or no ("NoRedist")     |             |              |
|                           | redistribution                                                        |   String    |  FluxRedist  |
+---------------------------+-----------------------------------------------------------------------+-------------+--------------+

Notes: The code was originally developed with MOL and FluxRedist. Preliminary 
tests show that the new single-step Godunov method is roughly twice as fast as 
the predictor-corrector MOL at the same time step (e.g., CFL limited to 0.5). 
Further, the Godunov method allows for roughly twice the time step, CFL should 
be limited to 0.9 for stability. Finally, it is recommended that the Godunov 
method be used in conjunction with StateRedist. While not fully vetted, early 
tests also show increased stability in complex geometries for a StateRedist-
Godunov scheme compared to the previous FluxRedist-MOL scheme. 

