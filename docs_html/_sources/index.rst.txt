.. MFiX-EXA documentation master file, created Thu Aug  2 12:19:39 2018.

Welcome to MFiX-EXA's documentation!
====================================

MFiX-Exa is a new multiphase computational fluid dynamics (CFD) modeling tool
that can take advantage of massively parallel high performance computers (HPC)
with the goal of scaling well at exascale.  It combines the underlying physics
from the existing `MFiX <https://mfix.netl.doe.gov/>`_ code with the
`AMReX <https://amrex-codes.github.io/amrex/>`_ framework, creating the next
generation, high performance, multiphase CFD workhorse.

.. image:: /images/particle_banner.png

MFiX-Exa is under active development as part of the MFiX-Exa
application project in DOE's
`Exascale Computing Project (ECP) <https://www.exascaleproject.org/>`_. All of
MFiX-Exa's development is done in the
`NETL gitlab repository <https://mfix.netl.doe.gov/gitlab/exa/mfix>`_, with
active development in the develop branch. Changes are merged into
the master branch at the beginning of each month.

When mature, this project will provide a modern multi-level multi-grid fluid
solver with chemistry, heat transfer, complex geometry, and two particle models:

1. **Discrete particle method (DEM)** - Each particle is modeled as a sphere,
   resolving all particle collisions
2. **Particle in cell method (PIC)** - Particles are group in parcels and see
   other parcels through a stress gradient.

To get started with MFiX-Exa, follow the user guide sections:

.. toctree::
   :maxdepth: 1
   :caption: User guide:

   Introduction
   GettingStarted_Chapter
   Inputs_Chapter
   ManagingGridHierarchy_Chapter


To learn more about the implementation, follow the following reference sections:

.. toctree::
   :maxdepth: 1
   :caption: Reference:

   Fluids_Chapter
   Particles_Chapter
   EB_Chapter
   Debugging

The following section detail the testing and benchmarks used to ensure solutions
and performance:

.. toctree::
   :maxdepth: 1
   :caption: Tests and Benchmarks:

   RunningTestSuite
   RegressionTesting
   CITests
   NightlyTests
   qb/index

Notice
------

Neither the United States Government nor any agency thereof, nor any of
their employees, makes any warranty, expressed or implied, or assumes
any legal liability or responsibility for the accuracy, completeness, or
usefulness of any information, apparatus, product, or process disclosed
or represents that its use would not infringe privately owned rights.

-  MFiX-Exa is provided without any user support for applications in the
   user's immediate organization. It should not be redistributed in
   whole or in part.

-  The use of MFiX-Exa is to be acknowledged in any published paper based on
   computations using this software by citing this MFiX-Exa site.

-  The authors would appreciate receiving any reports of bugs or other
   difficulties with the software, enhancements to the software, and
   accounts of practical applications of this software.
