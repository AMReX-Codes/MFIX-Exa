.. _Chap:InputsMultigrid:

Multigrid Inputs
================

The following inputs can be set directly in the AMReX solver classes but we 
set them via the MFIX-Exa routines because we may want different inputs for the 
different solvers called by MFIX-Exa. 
NOTE: the nodal solver settings are read in directly by AMReX, 
the MAC and diffusion settings by MFIX-Exa. 

These control the nodal projection and must be preceded by "nodal_proj.": 

+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
|                         |  Description                                                          |   Type      | Default      |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| verbose                 |  Verbosity of multigrid solver in nodal projection                    |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_verbose          |  Verbosity of BiCGStab solver in nodal projection                     |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_rtol                 |  Relative tolerance in nodal projection                               |    Real     |   1.e-11     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_atol                 |  Absolute tolerance in nodal projection                               |    Real     |   1.e-14     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| maxiter                 |  Maximum number of iterations in the nodal projection                 |    Int      |   100        | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_maxiter          |  Maximum number of iterations in the nodal projection                 |    Int      |   100        | 
|                         |  bottom solver if using bicg, cg, bicgcg or cgbicg                    |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_max_coarsening_level |  Maximum number of coarser levels to allowin the nodal projection     |    Int      |   100        | 
|                         |  If set to 0, the bottom solver will be called at the current level   |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_solver           |  Which bottom solver to use in the nodal projection                   |  String     |   bicgcg     |
|                         |                                                                       |             |              | 
|                         |  Options are bicgcg, bicgstab, cg, cgbicg, smoother or hypre          |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_namespace         |  Namespace to use in the nodal projection when using hypre            |  String     |   hypre      |
|                         |  to control hypre specific settings. It can be any string.            |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_interface         |  Which interface to use in the nodal projection when using hypre      |  String     |   ij         |
|                         |                                                                       |             |              | 
|                         |  Options are ij, semi_structured or structured                        |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+

These control the MAC projection and must be preceded by "mac_proj.":

+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
|                         | Description                                                           |   Type      | Default      |
+=========================+=======================================================================+=============+==============+
| verbose                 |  Verbosity of multigrid solver in MAC projection                      |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_verbose          |  Verbosity of BiCGStab solver in MAC projection                       |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_rtol                 |  Relative tolerance in MAC projection                                 |    Real     |   1.e-11     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_atol                 |  Absolute tolerance in MAC projection                                 |    Real     |   1.e-14     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| maxiter                 |  Maximum number of iterations in the MAC projection                   |    Int      |   200        | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_maxiter          |  Maximum number of iterations in the MAC projection                   |    Int      |   200        | 
|                         |  bottom solver if using bicg, cg, bicgcg or cgbicg                    |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_max_coarsening_level |  Maximum number of coarser levels to allow in the MAC projection      |    Int      |   100        | 
|                         |  If set to 0, the bottom solver will be called at the current level   |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_solver           |  Which bottom solver to use in the MAC projection                     |  String     |   bicgcg     |
|                         |                                                                       |             |              | 
|                         |  Options are bicgcg, bicgstab, cg, cgbicg, smoother or hypre          |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_namespace         |  Namespace to use in the MAC projection when using hypre              |  String     |   hypre      |
|                         |  to control hypre specific settings. It can be any string.            |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| hypre_interface         |  Which interface to use in the MAC projection when using hypre        |  String     |   ij         |
|                         |                                                                       |             |              | 
|                         |  Options are ij, semi_structured or structured                        |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+

NOTE: If the :cpp:`nodal_proj` and :cpp:`mac_proj` :cpp:`hypre_namespace`'s are set, they must be distinct unless set to 
:cpp:`hypre`, in which case the default behavior is recovered in which case hypre settings apply to all solvers.  

These control the diffusion solver and must be preceded by "diffusion.":

+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
|                         | Description                                                           |   Type      | Default      |
+=========================+=======================================================================+=============+==============+
| verbose                 |  Verbosity of linear solver for diffusion solve                       |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_verbose          |  Verbosity of BiCGStab solver in diffusion solve                      |    Int      |   0          |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_rtol                 |  Relative tolerance in diffusion solve                                |    Real     |   1.e-11     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_atol                 |  Absolute tolerance in diffusion solve                                |    Real     |   1.e-14     | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| maxiter                 |  Maximum number of iterations in diffusion solve                      |    Int      |   100        |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_maxiter          |  Maximum number of iterations in diffusion solve                      |    Int      |   100        |
|                         |  bottom solver if using bicg, cg, bicgcg or cgbicg                    |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| mg_max_coarsening_level |  Maximum number of coarser levels to allow in diffusion solve         |    Int      |   100        |
|                         |  If set to 0, the bottom solver will be called at the current level   |             |              |
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
| bottom_solver           |  Which bottom solver to use in the diffusion solve                    |  String     |   bicgcg     |
|                         |                                                                       |             |              | 
|                         |  Options are bicgcg, bicgstab, cg, cgbicg, or smoother                |             |              | 
+-------------------------+-----------------------------------------------------------------------+-------------+--------------+
