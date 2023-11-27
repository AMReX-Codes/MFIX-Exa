Building MFIX-Exa
==================

This page gives the generic instructions for building MFIX-Exa using gmake and cmake.
For HPC cluser specific instructions, please refer to :ref:`GettingStarted:HPC`.


Building with gmake
--------------------

If you want to use gmake to build MFIX_Exa, you will need to
clone amrex and AMReX-Hydro into a local directories, and also
clone mfix:

.. code:: shell

    > git clone https://github.com/AMReX-Codes/amrex.git
    > git clone https://github.com/AMReX-Codes/AMReX-Hydro.git
    > git clone http://mfix.netl.doe.gov/gitlab/exa/mfix.git
    > cd mfix/exec

Then, edit the GNUmakefile (or set an environment variable)
to define AMREX_HOME and AMREX_HYDRO_HOME
to be the path to the directories where you have put amrex
and AMReX-Hydro.  Note that the default locations of
AMREX_HOME and AMREX_HYDRO_HOME are in the subprojects directory,
which is where a cmake configuration may clone these repositories.
Other options that you can set include

+-----------------+----------------------------------+------------------+-------------+
| Option name     | Description                      | Possible values  | Default     |
|                 |                                  |                  | value       |
+=================+==================================+==================+=============+
| COMP            | Compiler (gnu or intel)          | gnu / intel      | gnu         |
+-----------------+----------------------------------+------------------+-------------+
| USE_MPI         | Enable MPI                       | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_OMP         | Enable OpenMP                    | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_CSG         | Enable CSG geometry file support | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_CUDA        | Enable CUDA GPU support          | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_HIP         | Enable HIP GPU support           | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_DPCPP       | Enable DPCPP GPU support         | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| USE_HYPRE       | Enable HYPRE support             | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| DEBUG           | Create a DEBUG executable        | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| PROFILE         | Include profiling info           | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| TRACE_PROFILE   | Include trace profiling info     | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| COMM_PROFILE    | Include comm profiling info      | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| TINY_PROFILE    | Include tiny profiling info      | TRUE / FALSE     | FALSE       |
+-----------------+----------------------------------+------------------+-------------+
| DIM             | Dimensionality of problem        | 2 / 3            | 3           |
+-----------------+----------------------------------+------------------+-------------+

.. note::
   **Do not set both USE_OMP and USE_CUDA/HIP/DPCPP to true.**

Then type

.. code:: shell

    > make -j

An executable will appear; the executable name will reflect
some of the build options above.


Building with cmake
--------------------

CMake build is a two-step process. First ``cmake`` is invoked to create
configuration files and makefiles in a chosen directory (``builddir``).
Next, the actual build is performed by invoking ``make`` from within ``builddir``.
If you are new to CMake, `this short tutorial <https://hsf-training.github.io/hsf-training-cmake-webpage/>`_
from the HEP Software foundation is the perfect place to get started with it.


The CMake build process for MFIX-Exa is summarized as follows:

.. highlight:: console

::

    >> mkdir /path/to/builddir
    >> cd    /path/to/builddir
    >> cmake [options] -DCMAKE_BUILD_TYPE=[Debug|Release|RelWithDebInfo|MinSizeRel] /path/to/mfix
    >> make

In the above snippet, ``[options]`` indicates one or more options for the
customization of the build, as described later in this section.
If the option ``CMAKE_BUILD_TYPE`` is omitted,
``CMAKE_BUILD_TYPE=Release`` is assumed.

There are two modes to build MFIX-Exa with cmake:

o **SUPERBUILD (recommended):** The AMReX and AMReX-Hydro git repos are cloned and built as part
of the MFIX-Exa build process and placed in the ``mfix/subprojects`` directory.
Each of these repos can be manipulated like a regular git repo
(you can change branches, hashes, add remotes, etc.)
This method is strongly encouraged as it ensures that the configuration options
for MFIX-Exa are compatible with the AMReX and AMReX-Hydro hashes that are checked out.

o **STANDALONE:** MFIX-Exa source code is built separately and linked to existing
AMReX and AMReX-Hydro repos. This is ideal for continuous integration severs (CI)
and regression testing applications. AMReX and AMReX_Hydro library versions and
configuration options must meet MFIX-Exa requirements.

.. note::
   **MFIX-Exa requires CMake 3.20 or higher.**

.. _sec:build:superbuild:

SUPERBUILD Instructions (recommended)
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

By default MFIX-Exa CMake looks for an existing AMReX installation on the system. If none is found, it falls back to **SUPERBUILD** mode.
In this mode, MFIX-Exa CMake inherents AMReX CMake targets and configuration options, that is, MFIX-Exa and AMReX are configured and built as a single entity

Assuming no valid AMReX installation is present on the target system, and ``AMReX_ROOT`` is not set (see :ref:`sec:build:standalone`), the following code will build MFIX-Exa in **SUPERBUILD** mode:

.. code:: shell

    > git clone http://mfix.netl.doe.gov/gitlab/exa/mfix.git
    > cd mfix
    > mkdir build
    > cd build
    > cmake [mfix options] [amrex options] -DCMAKE_BUILD_TYPE=[Debug|Release|RelWithDebInfo|MinSizeRel] ..
    > make -j

``[amrex options]`` in the snippet above is a list of any of the AMReX configuration options listed in
the `AMReX user guide <https://amrex-codes.github.io/amrex/docs_html/BuildingAMReX.html#building-with-cmake>`_,
while ``[mfix options]`` is any of the configuration options listed :ref:`here <tab:mfixcmakeoptions>`.


For example, to enable AMReX profiling capabilities in MFIX_Exa, configure as follows:

.. code:: shell

    > cmake [mfix options] -DAMReX_TINY_PROFILE=yes -DCMAKE_BUILD_TYPE=[Debug|Release|RelWithDebInfo|MinSizeRel] ..



Working with the AMReX submodule
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

**SUPERBUILD** mode relies on a git submodule to checkout the AMReX git repository.
If the AMReX submodule is not initialized, **SUPERBUILD** mode will initialize it and checkout
the AMReX commit the submodule is pointing to.
Instead, if the AMReX submodule has already been manually initialized and a custom commit has been checked out,
**SUPERBUILD** mode will use that commit. For MFIX-Exa development or testing, you may need to build with a different
branch or release of AMReX.

The ``subprojects/amrex`` directory is a Git repo, so use all standard Git
commands. Either ``cd subprojects/amrex`` to run Git commands in the ``amrex``
directory, or use ``git -C subprojects/amrex`` in the MFIX-Exa repo. For
instance, to build with the ``my-amrex-branch`` branch of the AMReX repo:

.. code:: shell

    > cd /path/to/mfix
    > git -C subprojects/amrex checkout my-amrex-branch
    > git status
    ...
    modified:   subprojects/amrex (new commits)

The branch ``my-amrex-branch`` will then be used when building MFIX-Exa.

To revert to the default version of the AMReX submodule, run ``git submodule
update``:

.. code:: shell

    > cd /path/to/mfix
    > git submodule update

You can edit, commit, pull, and push AMReX changes from ``subprojects/amrex``.
AMReX development is outside the scope of this document. Run ``git status`` in
the top-level MFix-Exa repo to see whether the AMReX submodule has new commits,
modified files, or untracked files.

To update the AMReX submodule referenced by MFIX-Exa:

.. code:: shell

    > git -C subprojects/amrex checkout UPDATED_AMREX_COMMIT_SHA1
    > git add subprojects/amrex
    > git commit -m 'Updating AMReX version'

This will only update the AMReX SHA-1 referenced by MFIX-Exa. Uncommitted AMReX
changes and untracked AMReX files under ``subprojects/amrex`` are not added by
``git add subprojects/amrex``. (To commit to the AMReX repo, change directories
to ``subprojects/amrex`` and run Git commands there, before ``git add
subprojects/amrex``.)

.. note::

    Only update the AMReX submodule reference in coordination with the other
    MFIX-Exa developers!


.. _sec:build:standalone:

STANDALONE instructions
<<<<<<<<<<<<<<<<<<<<<<<

Building AMReX
>>>>>>>>>>>>>>

Clone AMReX from the official Git repository.
Note that the only branch available is *development*:

.. code:: shell

    > git clone https://github.com/AMReX-Codes/amrex.git

Next, configure, build and install AMReX as follows:

.. code:: shell

    > cd amrex
    > mkdir build
    > cd build
    > cmake -DCMAKE_BUILD_TYPE=[Debug|Release|RelWithDebInfo|MinSizeRel] -DAMReX_PARTICLES=yes -DAMReX_EB=yes -DAMReX_PLOTFILE_TOOLS=yes [other amrex options] -DCMAKE_INSTALL_PREFIX:PATH=/absolute_path_to_amrex_installdir ..
    > make install

The options **AMReX\_PARTICLES=yes**, **AMReX\_EB=yes** and  **AMReX\_PLOTFILE\_TOOLS=yes** are required by MFIX-Exa. ``[other amrex options]`` in the snippet above refers to any other AMReX configuration option in addition to the required ones. Please refer to the `AMReX user guide <https://amrex-codes.github.io/amrex/docs_html/BuildingAMReX.html#building-with-cmake>`_ for more details on building AMReX with CMake.


Building MFIX-Exa
>>>>>>>>>>>>>>>>>

Clone and build MFIX-Exa:

.. code:: shell

    > git clone http://mfix.netl.doe.gov/gitlab/exa/mfix.git
    > mkdir build
    > cd build
    > cmake -DCMAKE_BUILD_TYPE=[Debug|Release|RelWithDebInfo|MinSizeRel] [mfix options] -DAMReX_ROOT=/absolute/path/to/amrex/installdir ..
    > make -j


Passing ``-DAMReX_ROOT=/absolute/path/to/amrex/installdir`` instructs CMake to search
``/absolute/path/to/amrex/installdir`` before searching system paths
for an available AMReX installation.
``AMReX_ROOT`` can also be set as an environmental variable instead of passing it as a command line option.
``[mfix options]`` indicates any of the configuration option listed in the table below.


.. _tab:mfixcmakeoptions:

.. table:: MFIX-Exa configuration options

           +-----------------+------------------------------+------------------+-------------+
           | Option name     | Description                  | Possible values  | Default     |
           |                 |                              |                  | value       |
           +=================+==============================+==================+=============+
           | CMAKE\_CXX\     | User-defined C++ flags       | valid C++        | None        |
           | _FLAGS          |                              | compiler flags   |             |
           +-----------------+------------------------------+------------------+-------------+
           | CMAKE\_CUDA\    | User-defined CUDA flags      | valid CUDA       | None        |
           | _FLAGS          |                              | compiler flags   |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_MPI       | Enable build with MPI        | no/yes           | yes         |
           |                 |                              |                  |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_OMP       | Enable build with OpenMP     | no/yes           | no          |
           |                 |                              |                  |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_GPU\_     | On-node, accelerated GPU \   | NONE,SYSCL,\     | NONE        |
           | BACKEND         | backend                      | CUDA,HIP         |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_HYPRE     | Enable HYPRE support         | no/yes           | no          |
           |                 |                              |                  |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_FPE       | Build with Floating-Point    | no/yes           | no          |
           |                 | Exceptions checks            |                  |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_CSG       | Build with CSG support       | no/yes           | no          |
           |                 |                              |                  |             |
           +-----------------+------------------------------+------------------+-------------+
           | MFIX\_MPI\_     | Concurrent MPI calls from    | no/yes           | no          |
           | THREAD\_MULTIPLE| multiple threads             |                  |             |
           |                 |                              |                  |             |
           |                 |                              |                  |             |
           +-----------------+------------------------------+------------------+-------------+



Few more notes on building MFIX-Exa with cmake
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

The system defaults compilers can be overwritten as follows:

.. code:: shell

    > cmake -DCMAKE_CXX_COMPILER=<c++-compiler> [options]  ..

When building on a platform that uses the ``module`` utility, use either
the above command (with full path to the compilers) or the following:

.. code:: shell

    > cmake -DCMAKE_CXX_COMPILER=CC [options] ..

MFIX-Exa uses the same compiler flags used to build AMReX, unless
``CMAKE_CXX_FLAGS`` is explicitly provided, or
the environmental variable ``CXXFLAGS`` is set.


For GPU builds, MFIX-Exa relies on the `AMReX GPU build infrastructure <https://amrex-codes.github.io/amrex/docs_html/GPU.html#building-with-cmake>`_
. The target architecture to build for can be specified via the AMReX configuration option ``-DAMReX_CUDA_ARCH=<target-architecture>``,
or by defining the *environmental variable* ``AMREX_CUDA_ARCH`` (all caps). If no GPU architecture is specified,
CMake will try to determine which GPU is supported by the system.
