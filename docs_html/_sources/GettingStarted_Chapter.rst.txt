.. _Chap:GettingStarted:

Getting Started
===============

The MFIX-Exa source code currently lives in NETL's
`gitlab repository <https://mfix.netl.doe.gov/gitlab/exa/mfix>`_. The repository
can be cloned by using git:

.. code-block:: shell

   > git clone https://mfix.netl.doe.gov/gitlab/exa/mfix.git

.. note::

   Access to the repository is currently restricted to project members. As the
   code matures, a distribution mechanism will be developed.

MFIX-Exa is also dependent on the AMReX and AMReX-Hydro git repositories.
For cmake builds these repositories may be cloned as part of the configuration.
Details are included in the sections below.

Once you have obtained the source code, the following sections describe the
source code contents, compiling, running a simple simulation, and visualizing
the simulations results.

.. toctree::
   :maxdepth: 1

   Building MFIX-Exa <getting_started/BuildingMFIX>
   Running your first simulation <getting_started/FirstSimulation>
   Visualizing simulation results <getting_started/Visualization>
   HPC <getting_started/Hpc>
