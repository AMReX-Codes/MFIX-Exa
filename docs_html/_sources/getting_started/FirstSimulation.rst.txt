First Simulation
================

Now that you have compiled the code and have an executable,
we will run a simple example that contains fluid, particles,
and embedded boundaries.  This particular example is
particles flowing down a cylinder.
First, edit ``path/to/mfix/benchmarks/05-cyl-fluidbed/Size0001/inputs``
so that ``mfix.write_eb_surface = true`` and ``mfix.plot_int = 1``.
Then, run the example with:

.. highlight:: console

::

    >> <executable> path/to/mfix/benchmarks/05-cyl-fluidbed/Size0001/inputs

The code will generate plotfiles with prefix ``plt*`` and geometry files
with prefix ``eb*``.
See :ref:`Chap:Visualization` for how to view this dataset.
